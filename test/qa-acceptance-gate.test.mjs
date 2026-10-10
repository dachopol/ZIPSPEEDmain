import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {evaluateAcceptance,REQUIRED_GATES,VISUAL_CATEGORIES,BENEFIT_CATEGORIES} from "../qa/evidence-gate.mjs";
const SHA="a".repeat(40),OLD="b".repeat(40),HASH="c".repeat(64);
const baseline=()=>JSON.parse(readFileSync(new URL("../qa/acceptance-report.json",import.meta.url),"utf8"));

test("Incomplete app QA never produces a number or ready status",()=>{
 const report=evaluateAcceptance(baseline(),SHA);
 assert.equal(report.decision,"NOT_READY");
 assert.equal(report.visual_ux,"--/25");
 assert.equal(report.benefit,"--/25");
 assert.ok(report.pending.includes("physical_android"));
});
test("Manually invented score total is rejected, including while unverified",()=>{
 const doc=baseline();doc.reviews.visual_ux.score=20;
 assert.equal(evaluateAcceptance(doc,SHA).decision,"INVALID_REPORT");
});
test("Old green CI cannot turn physical QA green",()=>{
 const doc=baseline();doc.candidate.source_sha=SHA;
 doc.gates.source_ci={status:"PASS",evidence:[{source_sha:SHA,reference:"ci/123",observation:"test",artifact_sha256:null}]};
 const report=evaluateAcceptance(doc,SHA);
 assert.equal(report.decision,"NOT_READY");
 assert.equal(report.gates.physical_android,"TO_VERIFY");
 assert.equal(report.visual_ux,"--/25");
});
test("Stale CI result fails closed",()=>{
 const doc=baseline();doc.candidate.source_sha=SHA;
 doc.gates.source_ci={status:"PASS",evidence:[{source_sha:OLD,reference:"ci/old",observation:"old run",artifact_sha256:null}]};
 assert.ok(evaluateAcceptance(doc,SHA).errors.includes("source_ci:unverified_pass"));
});
test("Cannot hand-score 25 points without complete real-device TH/EN pages",()=>{
 const doc=baseline();doc.candidate.source_sha=SHA;doc.candidate.artifact_sha256=HASH;
 doc.reviews.visual_ux={status:"ASSESSED",reviewer:"test reviewer",reviewed_at:"2026-10-10",review_method:"human_evidence_review",source_sha:SHA,artifact_sha256:HASH,captures:[],scores:Object.fromEntries(VISUAL_CATEGORIES.map(c=>[c,{value:5,reason:"fixture only",evidence_ref:"fixture.png"}]))};
 const report=evaluateAcceptance(doc,SHA);
 assert.equal(report.decision,"INVALID_REPORT");
 assert.ok(report.errors.some(x=>x.startsWith("visual_ux:missing_or_duplicate_th_speed")));
});
test("Benefit categories reject scores out of 0-5 range",()=>{
 const doc=baseline();doc.candidate.source_sha=SHA;doc.candidate.artifact_sha256=HASH;
 doc.reviews.benefit={status:"ASSESSED",reviewer:"test reviewer",review_method:"human_evidence_review",reviewed_at:"2026-10-10",source_sha:SHA,artifact_sha256:HASH,scores:Object.fromEntries(BENEFIT_CATEGORIES.map(c=>[c,{value:6,reason:"fixture only",evidence_ref:"fixture"}]))};
 assert.ok(evaluateAcceptance(doc,SHA).errors.includes("benefit:invalid_user_problem"));
});
test("Mandatory gates cannot be deleted or bypassed with N/A",()=>{
 const doc=baseline();delete doc.gates.physical_android;
 assert.equal(REQUIRED_GATES.length,8);
 assert.ok(evaluateAcceptance(doc,SHA).errors.includes("invalid_gate_inventory"));
 const other=baseline();other.gates.physical_android={status:"N_A",evidence:[],reason:"not needed"};
 assert.ok(evaluateAcceptance(other,SHA).errors.includes("physical_android:mandatory_gate_cannot_be_skipped"));
});
test("No fake app completion from report template",()=>{
 const report=evaluateAcceptance(baseline(),SHA);
 assert.ok(report.test_matrix.some(row=>row.status==="PASS_HISTORICAL"));
 assert.ok(report.defects.some(row=>row.status==="OPEN"));
 assert.equal(report.decision,"NOT_READY");
});
