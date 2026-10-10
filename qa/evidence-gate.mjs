/** Source-bound QA reporting. Checks structure, not the authenticity of external evidence. */
import {readFileSync} from "node:fs";
import {execFileSync} from "node:child_process";

export const VISUAL_CATEGORIES=Object.freeze(["cleanliness","hierarchy","color_harmony","typography","consistency"]);
export const BENEFIT_CATEGORIES=Object.freeze(["user_problem","data_integrity","ease_of_use","trust","resource_efficiency"]);
export const REQUIRED_GATES=Object.freeze(["source_ci","browser_runtime","emulator_runtime","physical_android","physical_visual_th_en","real_measurement","security_privacy","signed_release"]);
export const REQUIRED_VISUAL_STATES=Object.freeze([
 ["speed","ready"],["speed","loading"],["speed","downloading"],["speed","uploading"],["speed","stopped"],["speed","error"],["speed","result"],
 ["video","default"],["status","default"],["map","default"],["history","default"],["settings","default"],["settings","guide-open"],["adfree","default"]
]);
const states=new Set(["PASS","FAIL","BLOCKED","TO_VERIFY","N_A"]);
const isText=x=>typeof x==="string"&&x.trim().length>0;
const isSha=x=>typeof x==="string"&&/^[a-f0-9]{40}$/.test(x);
const isDigest=x=>typeof x==="string"&&/^[a-f0-9]{64}$/.test(x);
function evidenceBound(row,sha){
 return row&&typeof row==="object"&&row.source_sha===sha&&isText(row.reference)&&isText(row.observation)&&
  (row.artifact_sha256===null||isDigest(row.artifact_sha256));
}
function reviewScore(review,categories,sha,errors,name,requiresScreens){
 if(!review||typeof review!=="object"){errors.push(name+":missing_review");return null}
 if(review.status==="TO_VERIFY"){
  if(review.scores!==null||review.score!==undefined||review.total!==undefined)errors.push(name+":unverified_scores_forbidden");
  return null;
 }
 if(review.status!=="ASSESSED"){errors.push(name+":invalid_status");return null}
 if(review.score!==undefined||review.total!==undefined)errors.push(name+":manual_total_forbidden");
 if(!isText(review.reviewer)||!isText(review.reviewed_at)||review.source_sha!==sha||
    !isDigest(review.artifact_sha256)||review.review_method!=="human_evidence_review")
  errors.push(name+":missing_human_review_identity");
 if(requiresScreens){
  const captures=Array.isArray(review.captures)?review.captures:[];
  for(const [page,state] of REQUIRED_VISUAL_STATES)for(const locale of ["th","en"]){
   const found=captures.filter(c=>c&&c.locale===locale&&c.page_id===page&&c.state===state&&
    c.source_sha===sha&&c.artifact_sha256===review.artifact_sha256&&isDigest(c.screenshot_sha256)&&
    isText(c.reference)&&isText(c.device));
   if(found.length!==1)errors.push(name+":missing_or_duplicate_"+locale+"_"+page+"_"+state);
  }
 }
 if(!review.scores||typeof review.scores!=="object"||Object.keys(review.scores).length!==categories.length){
  errors.push(name+":missing_category_scores");return null;
 }
 let sum=0;
 for(const category of categories){
  const r=review.scores[category];
  if(!r||!Number.isInteger(r.value)||r.value<0||r.value>5||!isText(r.reason)||!isText(r.evidence_ref))
   errors.push(name+":invalid_"+category);
  else sum+=r.value;
 }
 return errors.some(x=>x.startsWith(name+":"))?null:sum;
}
export function evaluateAcceptance(input,currentSha){
 const errors=[];
 if(!input||typeof input!=="object"||input.schema_version!==1)return{decision:"INVALID_REPORT",errors:["invalid_schema"]};
 if(!isSha(currentSha))errors.push("invalid_source_sha");
 if(input.project!=="Zipspeed by AnakinYoo"||!isText(input.owner))errors.push("project_or_owner_invalid");
 if(!input.candidate||(input.candidate.source_sha!==null&&input.candidate.source_sha!==currentSha))errors.push("stale_candidate");
 if(!input.gates||typeof input.gates!=="object"||Object.keys(input.gates).length!==REQUIRED_GATES.length)errors.push("invalid_gate_inventory");
 const gateStates={};
 for(const name of REQUIRED_GATES){
  const gate=input.gates?.[name];
  if(!gate||!states.has(gate.status)){gateStates[name]="TO_VERIFY";errors.push(name+":unknown_gate");continue;}
  gateStates[name]=gate.status;
  if(gate.status==="PASS"){
   if(input.candidate?.source_sha!==currentSha||!Array.isArray(gate.evidence)||!gate.evidence.length||
      gate.evidence.some(e=>!evidenceBound(e,currentSha)))errors.push(name+":unverified_pass");
   if(["physical_android","physical_visual_th_en","signed_release"].includes(name)&&
      (!isDigest(input.candidate?.artifact_sha256)||!isText(input.candidate?.package_id)||
       !Number.isInteger(input.candidate?.version_code)))errors.push(name+":missing_artifact_identity");
  }
  if(gate.status==="N_A"&&(!isText(gate.reason)||!isText(gate.approved_by)||
     !Array.isArray(gate.evidence)||!gate.evidence.length))errors.push(name+":unapproved_exception");
  if(["physical_android","physical_visual_th_en","real_measurement"].includes(name)&&gate.status==="N_A")
   errors.push(name+":mandatory_gate_cannot_be_skipped");
 }
 const visual=reviewScore(input.reviews?.visual_ux,VISUAL_CATEGORIES,currentSha,errors,"visual_ux",true);
 const benefit=reviewScore(input.reviews?.benefit,BENEFIT_CATEGORIES,currentSha,errors,"benefit",false);
 if(input.reviews?.visual_ux?.status==="ASSESSED"&&gateStates.physical_visual_th_en!=="PASS")
   errors.push("visual_ux:physical_gate_not_passed");
 if(!Array.isArray(input.test_matrix)||!Array.isArray(input.defects)||!Array.isArray(input.remaining_risks)||!isText(input.next_action))
   errors.push("report_fields_incomplete");
 const pending=REQUIRED_GATES.filter(name=>gateStates[name]!=="PASS");
 const decision=errors.length?"INVALID_REPORT":pending.length||visual===null||benefit===null?"NOT_READY":"READY_FOR_HUMAN_RELEASE_REVIEW";
 return{decision,source_sha:currentSha,gates:gateStates,visual_ux:visual===null?"--/25":visual+"/25",benefit:benefit===null?"--/25":benefit+"/25",pending,errors,
  test_matrix:input.test_matrix,defects:input.defects,remaining_risks:input.remaining_risks,next_action:input.next_action,
  note:"Score requires human evidence review. PASS is structurally checked but source authenticity must be verified independently. No automatic release, merge or app completion."};
}
if(process.argv[1]&&import.meta.url===new URL("file://"+process.argv[1]).href){
 const fileArg=process.argv.find(x=>x.startsWith("--file="));
 const file=fileArg?fileArg.slice(7):new URL("./acceptance-report.json",import.meta.url);
 const input=JSON.parse(readFileSync(file,"utf8"));
 const sha=execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim();
 const result=evaluateAcceptance(input,sha);
 console.log(JSON.stringify(result,null,2));
 if(result.decision==="INVALID_REPORT")process.exitCode=1;
 if(process.argv.includes("--require-ready")&&result.decision!=="READY_FOR_HUMAN_RELEASE_REVIEW")process.exitCode=2;
}
