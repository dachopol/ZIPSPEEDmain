package com.aistudio.zipspeed.zskt;

import android.app.Activity;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.webkit.MimeTypeMap;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.IOException;
import java.io.InputStream;

public class MainActivity extends Activity {
    private static final String APP_ORIGIN = "appassets.androidplatform.net";
    private WebView webView;
    private View startupSplash;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(getColor(R.color.zipspeed_splash_bg));

        webView = new WebView(this);
        webView.setBackgroundColor(getColor(R.color.zipspeed_splash_bg));

        startupSplash = new View(this);
        startupSplash.setId(R.id.startup_splash);
        startupSplash.setBackgroundResource(R.drawable.zipspeed_splash);
        startupSplash.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_NO);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setAllowFileAccessFromFileURLs(false);
        settings.setAllowUniversalAccessFromFileURLs(false);
        settings.setSaveFormData(false);
        settings.setSupportMultipleWindows(false);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            settings.setSafeBrowsingEnabled(true);
        }

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                return !("https".equals(uri.getScheme()) && APP_ORIGIN.equals(uri.getHost()));
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                Uri uri = Uri.parse(url);
                if ("https".equals(uri.getScheme())
                        && APP_ORIGIN.equals(uri.getHost())
                        && "/assets/index.html".equals(uri.getPath())
                        && startupSplash != null) {
                    startupSplash.setVisibility(View.GONE);
                }
            }

            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (!"https".equals(uri.getScheme()) || !APP_ORIGIN.equals(uri.getHost())) {
                    return super.shouldInterceptRequest(view, request);
                }
                String path = uri.getPath();
                if (path == null || !path.startsWith("/assets/")) {
                    return super.shouldInterceptRequest(view, request);
                }
                String assetPath = path.substring("/assets/".length());
                try {
                    InputStream input = getAssets().open(assetPath);
                    String extension = MimeTypeMap.getFileExtensionFromUrl(assetPath);
                    String mime = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
                    if (mime == null) {
                        mime = assetPath.endsWith(".mjs") ? "text/javascript"
                                : assetPath.endsWith(".css") ? "text/css"
                                : "application/octet-stream";
                    }
                    return new WebResourceResponse(mime, "UTF-8", input);
                } catch (IOException ignored) {
                    return null;
                }
            }
        });

        root.addView(webView, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));
        root.addView(startupSplash, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));
        setContentView(root);
        webView.loadUrl("https://" + APP_ORIGIN + "/assets/index.html");
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) webView.onResume();
    }

    @Override
    protected void onPause() {
        if (webView != null) {
            webView.evaluateJavascript(
                    "if (window.zipspeedStopForLifecycle) window.zipspeedStopForLifecycle();",
                    null
            );
            webView.onPause();
        }
        super.onPause();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.stopLoading();
            webView.loadUrl("about:blank");
            webView.removeAllViews();
            webView.destroy();
            webView = null;
        }
        startupSplash = null;
        super.onDestroy();
    }
}
