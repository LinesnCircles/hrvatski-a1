(function () {
  if ("speechSynthesis" in window) return;
  function SpeechSynthesisUtterance(text) {
    this.text = String(text);
    this.lang = "";
    this.rate = 1;
    this.pitch = 1;
    this.volume = 1;
    this.voice = null;
  }
  var hrVoice = {
    lang: "hr-HR",
    name: "Hrvatski (Android TTS)",
    default: true,
    localService: true,
    voiceURI: "android-tts-hr-HR"
  };
  window.SpeechSynthesisUtterance = SpeechSynthesisUtterance;
  window.speechSynthesis = {
    onvoiceschanged: null,
    pending: false,
    speaking: false,
    paused: false,
    getVoices: function () { return [hrVoice]; },
    speak: function (u) {
      try { window.AndroidTts.speak(u.text, u.lang || "hr-HR"); } catch (e) {}
    },
    cancel: function () { try { window.AndroidTts.cancel(); } catch (e) {} },
    pause: function () {},
    resume: function () {}
  };
})();
