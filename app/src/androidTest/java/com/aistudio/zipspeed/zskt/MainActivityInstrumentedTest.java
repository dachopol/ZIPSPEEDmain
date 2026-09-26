package com.aistudio.zipspeed.zskt;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import android.app.Activity;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;

import androidx.test.core.app.ActivityScenario;
import androidx.test.ext.junit.runners.AndroidJUnit4;

import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

@RunWith(AndroidJUnit4.class)
public class MainActivityInstrumentedTest {
    private static WebView findWebView(View view) {
        if (view instanceof WebView) return (WebView) view;
        if (view instanceof ViewGroup) {
            ViewGroup group = (ViewGroup) view;
            for (int i = 0; i < group.getChildCount(); i++) {
                WebView found = findWebView(group.getChildAt(i));
                if (found != null) return found;
            }
        }
        return null;
    }

    private static String eval(Activity activity, WebView webView, String script) throws Exception {
        for (int attempt = 0; attempt < 3; attempt++) {
            CountDownLatch latch = new CountDownLatch(1);
            AtomicReference<String> value = new AtomicReference<>();
            activity.runOnUiThread(() -> webView.evaluateJavascript(script, result -> {
                value.set(result);
                latch.countDown();
            }));
            if (latch.await(5, TimeUnit.SECONDS)) return value.get();
            Thread.sleep(250);
        }
        throw new AssertionError("JavaScript callback timed out after retries");
    }

    private static void waitTrue(Activity activity, WebView webView, String expression, long timeoutMs) throws Exception {
        long deadline = System.currentTimeMillis() + timeoutMs;
        while (System.currentTimeMillis() < deadline) {
            if ("true".equals(eval(activity, webView, expression))) return;
            Thread.sleep(120);
        }
        throw new AssertionError("Condition timed out: " + expression);
    }

    @Test
    public void bundledWebAppLoadsAndPrimaryControlsRespond() throws Exception {
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            AtomicReference<Activity> activityRef = new AtomicReference<>();
            AtomicReference<WebView> webViewRef = new AtomicReference<>();
            scenario.onActivity(activity -> {
                activityRef.set(activity);
                WebView webView = findWebView(activity.findViewById(android.R.id.content));
                webViewRef.set(webView);
            });

            Activity activity = activityRef.get();
            WebView webView = webViewRef.get();
            assertNotNull(activity);
            assertNotNull(webView);

            waitTrue(activity, webView, "document.readyState==='complete'", 10000);
            waitTrue(activity, webView, "document.getElementById('appVersion')?.textContent==='v79.0.0'", 10000);
            assertEquals("\"GO\"", eval(activity, webView, "document.getElementById(\'goButton\').textContent"));
            assertEquals("true", eval(activity, webView, "document.getElementById('shareButton').disabled"));

            assertEquals("true", eval(activity, webView,
                    "(()=>{document.querySelector('[data-tab=settings]').click();" +
                    "return document.getElementById('settings').classList.contains('active')&&" +
                    "document.querySelector('[data-tab=settings]').getAttribute('aria-selected')==='true'})()"));

            assertEquals("true", eval(activity, webView,
                    "(()=>{const e=document.getElementById('languageSetting');e.value='en';" +
                    "e.dispatchEvent(new Event('change',{bubbles:true}));" +
                    "return document.querySelector('[data-i18n=testProfile]').textContent==='Test profile'})()"));

            eval(activity, webView, "document.querySelector('[data-tab=speed]').click();document.getElementById('goButton').click();true");
            waitTrue(activity, webView, "document.getElementById('goButton').textContent==='STOP'", 2500);
            assertEquals("true", eval(activity, webView, "[\"profileSetting\",\"connectionSetting\",\"serverSetting\"].every(id=>document.getElementById(id).disabled)"));
            eval(activity, webView, "document.getElementById('goButton').click();true");
            waitTrue(activity, webView, "document.getElementById('goButton').textContent==='GO'", 8000);
            assertEquals("true", eval(activity, webView, "[\"profileSetting\",\"connectionSetting\",\"serverSetting\"].every(id=>!document.getElementById(id).disabled)"));

            assertEquals("true", eval(activity, webView, "location.href.startsWith(\'https://appassets.androidplatform.net/assets/index.html\')"));
        }
    }
}
