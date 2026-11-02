package com.linesncircles.hrvatskia1;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.view.KeyEvent;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.webkit.WebViewAssetLoader;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

public class MainActivity extends Activity {

    private static final String ASSETS_HOST = "https://appassets.androidplatform.net";

    private WebView webView;
    private WebViewAssetLoader assetLoader;
    private TextToSpeech tts;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                tts.setLanguage(Locale.forLanguageTag("hr-HR"));
            }
        });

        assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        webView = new WebView(this);
        setContentView(webView);

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.addJavascriptInterface(new TtsBridge(), "AndroidTts");
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Uri url = request.getUrl();
                WebResourceResponse res = assetLoader.shouldInterceptRequest(url);
                if (res == null) return null;
                String path = url.getPath();
                if (path != null && path.endsWith("/js/app.js")) {
                    try {
                        String polyfill = readAssetText("polyfill/tts-polyfill.js");
                        String appJs = readStream(res.getData());
                        byte[] merged = (polyfill + "\n" + appJs).getBytes(StandardCharsets.UTF_8);
                        return new WebResourceResponse("application/javascript", "utf-8",
                                new ByteArrayInputStream(merged));
                    } catch (IOException e) {
                        return res;
                    }
                }
                return res;
            }
        });

        webView.loadUrl(ASSETS_HOST + "/assets/www/index.html");
    }

    private String readAssetText(String name) throws IOException {
        return readStream(getAssets().open(name));
    }

    private static String readStream(InputStream in) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] buf = new byte[8192];
        int n;
        while ((n = in.read(buf)) != -1) out.write(buf, 0, n);
        in.close();
        return out.toString(StandardCharsets.UTF_8.name());
    }

    private void goBackOrFinish() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            finish();
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            goBackOrFinish();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @SuppressWarnings("deprecation")
    @Override
    public void onBackPressed() {
        goBackOrFinish();
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (webView != null) webView.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) webView.onResume();
    }

    @Override
    protected void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
            tts = null;
        }
        super.onDestroy();
    }

    private class TtsBridge {
        @JavascriptInterface
        public void speak(String text, String lang) {
            if (tts == null || text == null || text.isEmpty()) return;
            Locale locale = lang != null && !lang.isEmpty()
                    ? Locale.forLanguageTag(lang)
                    : Locale.forLanguageTag("hr-HR");
            tts.setLanguage(locale);
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "cro-a1-utterance");
        }

        @JavascriptInterface
        public void cancel() {
            if (tts != null) tts.stop();
        }
    }
}
