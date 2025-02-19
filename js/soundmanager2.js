﻿/** @license

 SoundManager 2: Javascript Sound for the Web
 --------------------------------------------
 http://schillmania.com/projects/soundmanager2/

 Copyright (c) 2007, Scott Schiller. All rights reserved.
 Code provided under the BSD License:
 http://schillmania.com/projects/soundmanager2/license.txt

 V2.97a.20101010
*/
(function (T) {
    function oa(Ga, Ha) {
        function pa() { if (b.debugURLParam.test(U)) b.debugMode = true } this.flashVersion = 8; this.debugFlash = this.debugMode = false; this.useConsole = true; this.waitForWindowLoad = this.consoleOnly = false; this.nullURL = "about:blank"; this.allowPolling = true; this.useFastPolling = false; this.useMovieStar = true; this.bgColor = "#ffffff"; this.useHighPerformance = false; this.flashLoadTimeout = 1E3; this.wmode = null; this.allowScriptAccess = "always"; this.useHTML5Audio = this.useFlashBlock = false; this.html5Test = /^probably$/i;
        this.ondebuglog = false; this.audioFormats = { mp3: { type: ['audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"], required: true }, mp4: { related: ["aac", "m4a"], type: ['audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"], required: true }, ogg: { type: ["audio/ogg; codecs=vorbis"], required: false }, wav: { type: ['audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav"], required: false } }; this.defaultOptions = {
            autoLoad: false, stream: true, autoPlay: false,
            loops: 1, onid3: null, onload: null, whileloading: null, onplay: null, onpause: null, onresume: null, whileplaying: null, onstop: null, onfailure: null, onfinish: null, onbeforefinish: null, onbeforefinishtime: 5E3, onbeforefinishcomplete: null, onjustbeforefinish: null, onjustbeforefinishtime: 200, multiShot: true, multiShotEvents: false, position: null, pan: 0, type: null, usePolicyFile: false, volume: 100
        }; this.flash9Options = { isMovieStar: null, usePeakData: false, useWaveformData: false, useEQData: false, onbufferchange: null, ondataerror: null, onstats: null };
        this.movieStarOptions = { bufferTime: 3, serverURL: null, onconnect: null, bufferTimes: null, duration: null }; this.version = null; this.versionNumber = "V2.97a.20101010"; this.movieURL = null; this.url = Ga || null; this.altURL = null; this.enabled = this.swfLoaded = false; this.o = null; this.movieID = "sm2-container"; this.id = Ha || "sm2movie"; this.swfCSS = { swfBox: "sm2-object-box", swfDefault: "movieContainer", swfError: "swf_error", swfTimedout: "swf_timedout", swfUnblocked: "swf_unblocked", sm2Debug: "sm2_debug", highPerf: "high_performance", flashDebug: "flash_debug" };
        this.oMC = null; this.sounds = {}; this.soundIDs = []; this.muted = false; this.debugID = "soundmanager-debug"; this.debugURLParam = /([#?&])debug=1/i; this.didFlashBlock = this.specialWmodeCase = false; this.filePattern = null; this.filePatterns = { flash8: /\.mp3(\?.*)?$/i, flash9: /\.mp3(\?.*)?$/i }; this.baseMimeTypes = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i; this.netStreamMimeTypes = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i; this.netStreamTypes = ["aac", "flv", "mov", "mp4", "m4v", "f4v", "m4a", "mp4v", "3gp", "3g2"]; this.netStreamPattern =
        RegExp("\\.(" + this.netStreamTypes.join("|") + ")(\\?.*)?$", "i"); this.mimePattern = this.baseMimeTypes; this.features = { buffering: false, peakData: false, waveformData: false, eqData: false, movieStar: false }; this.sandbox = {}; this.hasHTML5 = null; this.html5 = { usingFlash: null }; this.ignoreFlash = false; var ba, b = this, z, t = navigator.userAgent, U = T.location.href.toString(), o = this.flashVersion, k = document, l = T, qa, V, D = [], L = false, M = false, q = false, A = false, ra = false, N, s, sa, E, F, ca, W, ta, da, B, ua, O, G, ea, fa, X, ga, ha, va, wa, P, xa, Q = null, ia = null,
        H, ja, I, Y, Z, ka, p, $ = false, la = false, ya, za, J = null, Aa, aa, C = false, R, x, ma, Ba, y, v, Ca = Array.prototype.slice, Da = t.match(/pre\//i), Ia = t.match(/(ipad|iphone)/i); t.match(/mobile/i); var w = t.match(/MSIE/i), S = t.match(/safari/i) && !t.match(/chrome/i), na = typeof k.hasFocus !== "undefined" ? k.hasFocus() : null, K = typeof k.hasFocus === "undefined" && S, Ea = !K; this._use_maybe = U.match(/sm2\-useHTML5Maybe\=1/i); this._overHTTP = k.location ? k.location.protocol.match(/http/i) : null; this.useAltURL = !this._overHTTP; if (Ia || Da) {
            b.useHTML5Audio =
            true; b.ignoreFlash = true
        } if (Da || this._use_maybe) b.html5Test = /^(probably|maybe)$/i; this.supported = function () { return J ? q && !A : b.useHTML5Audio && b.hasHTML5 }; this.getMovie = function (c) { return w ? l[c] : S ? z(c) || k[c] : z(c) }; this.loadFromXML = function (c) { try { b.o._loadFromXML(c) } catch (a) { P() } return true }; this.createSound = function (c) {
            function a() { f = Y(f); b.sounds[e.id] = new ba(e); b.soundIDs.push(e.id); return b.sounds[e.id] } var f = null, i = null, e = null; if (!q || !b.supported()) {
                ka("soundManager.createSound(): " + H(!q ? "notReady" :
                "notOK")); return false
            } if (arguments.length === 2) c = { id: arguments[0], url: arguments[1] }; e = f = s(c); if (p(e.id, true)) return b.sounds[e.id]; if (aa(e)) { i = a(); i._setup_html5(e) } else {
                if (o > 8 && b.useMovieStar) { if (e.isMovieStar === null) e.isMovieStar = e.serverURL || (e.type ? e.type.match(b.netStreamPattern) : false) || e.url.match(b.netStreamPattern) ? true : false; if (e.isMovieStar) if (e.usePeakData) e.usePeakData = false } e = Z(e, "soundManager.createSound(): "); i = a(); if (o === 8) b.o._createSound(e.id, e.onjustbeforefinishtime, e.loops || 1,
                e.usePolicyFile); else { b.o._createSound(e.id, e.url, e.onjustbeforefinishtime, e.usePeakData, e.useWaveformData, e.useEQData, e.isMovieStar, e.isMovieStar ? e.bufferTime : false, e.loops || 1, e.serverURL, e.duration || null, e.autoPlay, true, e.bufferTimes, e.onstats ? true : false, e.autoLoad, e.usePolicyFile); if (!e.serverURL) { i.connected = true; e.onconnect && e.onconnect.apply(i) } }
            } if (e.autoLoad || e.autoPlay) if (i) if (b.isHTML5) { i.autobuffer = "auto"; i.preload = "auto" } else i.load(e); e.autoPlay && i.play(); return i
        }; this.destroySound =
        function (c, a) { if (!p(c)) return false; var f = b.sounds[c], i; f._iO = {}; f.stop(); f.unload(); for (i = 0; i < b.soundIDs.length; i++) if (b.soundIDs[i] === c) { b.soundIDs.splice(i, 1); break } a || f.destruct(true); delete b.sounds[c]; return true }; this.load = function (c, a) { if (!p(c)) return false; return b.sounds[c].load(a) }; this.unload = function (c) { if (!p(c)) return false; return b.sounds[c].unload() }; this.start = this.play = function (c, a) {
            if (!q || !b.supported()) { ka("soundManager.play(): " + H(!q ? "notReady" : "notOK")); return false } if (!p(c)) {
                a instanceof
                Object || (a = { url: a }); if (a && a.url) { a.id = c; return b.createSound(a).play() } else return false
            } return b.sounds[c].play(a)
        }; this.setPosition = function (c, a) { if (!p(c)) return false; return b.sounds[c].setPosition(a) }; this.stop = function (c) { if (!p(c)) return false; return b.sounds[c].stop() }; this.stopAll = function () { for (var c in b.sounds) b.sounds[c] instanceof ba && b.sounds[c].stop() }; this.pause = function (c) { if (!p(c)) return false; return b.sounds[c].pause() }; this.pauseAll = function () { for (var c = b.soundIDs.length; c--;) b.sounds[b.soundIDs[c]].pause() };
        this.resume = function (c) { if (!p(c)) return false; return b.sounds[c].resume() }; this.resumeAll = function () { for (var c = b.soundIDs.length; c--;) b.sounds[b.soundIDs[c]].resume() }; this.togglePause = function (c) { if (!p(c)) return false; return b.sounds[c].togglePause() }; this.setPan = function (c, a) { if (!p(c)) return false; return b.sounds[c].setPan(a) }; this.setVolume = function (c, a) { if (!p(c)) return false; return b.sounds[c].setVolume(a) }; this.mute = function (c) {
            var a = 0; if (typeof c !== "string") c = null; if (c) {
                if (!p(c)) return false;
                return b.sounds[c].mute()
            } else { for (a = b.soundIDs.length; a--;) b.sounds[b.soundIDs[a]].mute(); b.muted = true } return true
        }; this.muteAll = function () { b.mute() }; this.unmute = function (c) { if (typeof c !== "string") c = null; if (c) { if (!p(c)) return false; return b.sounds[c].unmute() } else { for (c = b.soundIDs.length; c--;) b.sounds[b.soundIDs[c]].unmute(); b.muted = false } return true }; this.unmuteAll = function () { b.unmute() }; this.toggleMute = function (c) { if (!p(c)) return false; return b.sounds[c].toggleMute() }; this.getMemoryUse = function () {
            if (o ===
            8) return 0; if (b.o) return parseInt(b.o._getMemoryUse(), 10)
        }; this.disable = function (c) { if (typeof c === "undefined") c = false; if (A) return false; A = true; for (var a = b.soundIDs.length; a--;) wa(b.sounds[b.soundIDs[a]]); N(c); v(l, "load", F); return true }; this.canPlayMIME = function (c) { var a; if (b.hasHTML5) a = R({ type: c }); return !J || a ? a : c ? c.match(b.mimePattern) ? true : false : null }; this.canPlayURL = function (c) { var a; if (b.hasHTML5) a = R(c); return !J || a ? a : c ? c.match(b.filePattern) ? true : false : null }; this.canPlayLink = function (c) {
            if (typeof c.type !==
            "undefined" && c.type) if (b.canPlayMIME(c.type)) return true; return b.canPlayURL(c.href)
        }; this.getSoundById = function (c) { if (!c) throw Error("SoundManager.getSoundById(): sID is null/undefined"); return b.sounds[c] }; this.onready = function (c, a) { if (c && c instanceof Function) { a || (a = l); sa(c, a); E(); return true } else throw H("needFunction"); }; this.getMoviePercent = function () { return b.o && typeof b.o.PercentLoaded !== "undefined" ? b.o.PercentLoaded() : null }; this._wD = this._writeDebug = function (c, a, f) {
            b.ondebuglog && b.ondebuglog(c,
            a, f); return true
        }; this._debug = function () { }; this.reboot = function () { for (var c = b.soundIDs.length; c--;) b.sounds[b.soundIDs[c]].destruct(); try { if (w) ia = b.o.innerHTML; Q = b.o.parentNode.removeChild(b.o) } catch (a) { } ia = Q = null; b.enabled = q = $ = la = L = M = A = b.swfLoaded = false; b.soundIDs = b.sounds = []; b.o = null; for (c = D.length; c--;) D[c].fired = false; l.setTimeout(function () { b.beginDelayedInit() }, 20) }; this.destruct = function () { b.disable(true) }; this.beginDelayedInit = function () { ra = true; G(); setTimeout(ua, 20); W() }; ba = function (c) {
            var a =
            this, f, i, e, j, n, h; this.sID = c.id; this.url = c.url; this._iO = this.instanceOptions = this.options = s(c); this.pan = this.options.pan; this.volume = this.options.volume; this._lastURL = null; this.isHTML5 = false; this.id3 = {}; this._debug = function () { }; this._debug(); this.load = function (d) {
                var g = null; if (typeof d !== "undefined") { a._iO = s(d); a.instanceOptions = a._iO } else { d = a.options; a._iO = d; a.instanceOptions = a._iO; if (a._lastURL && a._lastURL !== a.url) { a._iO.url = a.url; a.url = null } } if (a._iO.url === a.url && a.readyState !== 0 && a.readyState !==
                2) return a; a._lastURL = a.url; a.loaded = false; a.readyState = 1; a.playState = 0; if (aa(a._iO)) { g = a._setup_html5(a._iO); g.load(); a._iO.autoPlay && a.play() } else try { a.isHTML5 = false; a._iO = Z(Y(a._iO)); o === 8 ? b.o._load(a.sID, a._iO.url, a._iO.stream, a._iO.autoPlay, a._iO.whileloading ? 1 : 0, a._iO.loops || 1, a._iO.usePolicyFile) : b.o._load(a.sID, a._iO.url, a._iO.stream ? true : false, a._iO.autoPlay ? true : false, a._iO.loops || 1, a._iO.autoLoad ? true : false, a._iO.usePolicyFile) } catch (m) { ga() } return a
            }; this.unload = function () {
                if (a.readyState !==
                0) { if (a.isHTML5) { e(); if (h) { h.pause(); h.src = b.nullURL; h.load(); h = a._audio = null } } else o === 8 ? b.o._unload(a.sID, b.nullURL) : b.o._unload(a.sID); f() } return a
            }; this.destruct = function (d) { if (a.isHTML5) { e(); if (h) { h.pause(); h.src = "about:blank"; h.load(); h = a._audio = null } } else { a._iO.onfailure = null; b.o._destroySound(a.sID) } d || b.destroySound(a.sID, true) }; this.start = this.play = function (d, g) {
                var m; g = typeof g === "undefined" ? true : g; d || (d = {}); a._iO = s(d, a._iO); a._iO = s(a._iO, a.options); a.instanceOptions = a._iO; if (a._iO.serverURL) if (!a.connected) {
                    a.getAutoPlay() ||
                    a.setAutoPlay(true); return a
                } if (aa(a._iO)) { a._setup_html5(a._iO); j() } if (a.playState === 1 && !a.paused) if (m = a._iO.multiShot) a.isHTML5 && a.setPosition(a._iO.position); else return a; if (!a.loaded) if (a.readyState === 0) if (a.isHTML5) { a.load(a._iO); a.readyState = 1 } else { if (!a._iO.serverURL) { a._iO.autoPlay = true; a.load(a._iO) } } else if (a.readyState === 2) return a; if (a.paused && a.position && a.position > 0) a.resume(); else {
                    a.playState = 1; a.paused = false; if (!a.instanceCount || a._iO.multiShotEvents || o > 8 && !a.isHTML5 && !a.getAutoPlay()) a.instanceCount++;
                    a.position = typeof a._iO.position !== "undefined" && !isNaN(a._iO.position) ? a._iO.position : 0; a._iO = Z(Y(a._iO)); a._iO.onplay && g && a._iO.onplay.apply(a); a.setVolume(a._iO.volume, true); a.setPan(a._iO.pan, true); if (a.isHTML5) { j(); a._setup_html5().play() } else b.o._start(a.sID, a._iO.loops || 1, o === 9 ? a.position : a.position / 1E3)
                } return a
            }; this.stop = function (d) {
                if (a.playState === 1) {
                    a._onbufferchange(0); a.resetOnPosition(0); if (!a.isHTML5) a.playState = 0; a.paused = false; a._iO.onstop && a._iO.onstop.apply(a); if (a.isHTML5) {
                        if (h) {
                            a.setPosition(0);
                            h.pause(); a.playState = 0; a._onTimer(); e(); a.unload()
                        }
                    } else { b.o._stop(a.sID, d); a._iO.serverURL && a.unload() } a.instanceCount = 0; a._iO = {}
                } return a
            }; this.setAutoPlay = function (d) { a._iO.autoPlay = d; b.o._setAutoPlay(a.sID, d); d && !a.instanceCount && a.readyState === 1 && a.instanceCount++ }; this.getAutoPlay = function () { return a._iO.autoPlay }; this.setPosition = function (d) {
                if (d === undefined) d = 0; a.position = a.isHTML5 ? Math.max(d, 0) : Math.min(a.duration || a._iO.duration, Math.max(d, 0)); a.resetOnPosition(a.position); if (a.isHTML5) {
                    if (h) {
                        if (a.playState) try {
                            h.currentTime =
                            a.position / 1E3
                        } catch (g) { } if (a.paused) { a._onTimer(true); a._iO.useMovieStar && a.resume() }
                    }
                } else { d = o === 9 ? a.position : a.position / 1E3; a.playState === 0 ? a.play({ position: d }) : b.o._setPosition(a.sID, d, a.paused || !a.playState) } return a
            }; this.pause = function (d) { if (a.paused || a.playState === 0 && a.readyState !== 1) return a; a.paused = true; if (a.isHTML5) { a._setup_html5().pause(); e() } else if (d || d === undefined) b.o._pause(a.sID); a._iO.onpause && a._iO.onpause.apply(a); return a }; this.resume = function () {
                if (!a.paused) return a; a.paused =
                false; a.playState = 1; if (a.isHTML5) { a._setup_html5().play(); j() } else b.o._pause(a.sID); a._iO.onresume && a._iO.onresume.apply(a); return a
            }; this.togglePause = function () { if (a.playState === 0) { a.play({ position: o === 9 && !a.isHTML5 ? a.position : a.position / 1E3 }); return a } a.paused ? a.resume() : a.pause(); return a }; this.setPan = function (d, g) { if (typeof d === "undefined") d = 0; if (typeof g === "undefined") g = false; a.isHTML5 || b.o._setPan(a.sID, d); a._iO.pan = d; if (!g) a.pan = d; return a }; this.setVolume = function (d, g) {
                if (typeof d === "undefined") d =
                100; if (typeof g === "undefined") g = false; if (a.isHTML5) { if (h) h.volume = d / 100 } else b.o._setVolume(a.sID, b.muted && !a.muted || a.muted ? 0 : d); a._iO.volume = d; if (!g) a.volume = d; return a
            }; this.mute = function () { a.muted = true; if (a.isHTML5) { if (h) h.muted = true } else b.o._setVolume(a.sID, 0); return a }; this.unmute = function () { a.muted = false; var d = typeof a._iO.volume !== "undefined"; if (a.isHTML5) { if (h) h.muted = false } else b.o._setVolume(a.sID, d ? a._iO.volume : a.options.volume); return a }; this.toggleMute = function () {
                return a.muted ? a.unmute() :
                a.mute()
            }; this.onposition = function (d, g, m) { a._onPositionItems.push({ position: d, method: g, scope: typeof m !== "undefined" ? m : a, fired: false }); return a }; this.processOnPosition = function () { var d, g; d = a._onPositionItems.length; if (!d || !a.playState || a._onPositionFired >= d) return false; for (d = d; d--;) { g = a._onPositionItems[d]; if (!g.fired && a.position >= g.position) { g.method.apply(g.scope, [g.position]); g.fired = true; b._onPositionFired++ } } return true }; this.resetOnPosition = function (d) {
                var g, m; g = a._onPositionItems.length; if (!g) return false;
                for (g = g; g--;) { m = a._onPositionItems[g]; if (m.fired && d <= m.position) { m.fired = false; b._onPositionFired-- } } return true
            }; this._onTimer = function (d) { var g = {}; if (a._hasTimer || d) if (h && (d || (a.playState > 0 || a.readyState === 1) && !a.paused)) { a.duration = n(); a.durationEstimate = a.duration; d = h.currentTime ? h.currentTime * 1E3 : 0; a._whileplaying(d, g, g, g, g); return true } else return false }; n = function () { var d = h ? h.duration * 1E3 : undefined; return d && !isNaN(d) ? d : null }; j = function () { a.isHTML5 && ya(a) }; e = function () { a.isHTML5 && za(a) }; f =
            function () {
                a._onPositionItems = []; a._onPositionFired = 0; a._hasTimer = null; a._added_events = null; h = a._audio = null; a.bytesLoaded = null; a.bytesTotal = null; a.position = null; a.duration = a._iO && a._iO.duration ? a._iO.duration : null; a.durationEstimate = null; a.failures = 0; a.loaded = false; a.playState = 0; a.paused = false; a.readyState = 0; a.muted = false; a.didBeforeFinish = false; a.didJustBeforeFinish = false; a.isBuffering = false; a.instanceOptions = {}; a.instanceCount = 0; a.peakData = { left: 0, right: 0 }; a.waveformData = { left: [], right: [] }; a.eqData =
                []; a.eqData.left = []; a.eqData.right = []
            }; f(); this._setup_html5 = function (d) { d = s(a._iO, d); if (h) { if (a.url !== d.url) h.src = d.url } else { a._audio = new Audio(d.url); h = a._audio; a.isHTML5 = true; i() } h.loop = d.loops > 1 ? "loop" : ""; return a._audio }; i = function () {
                function d(g, m, r) { return h ? h.addEventListener(g, m, r || false) : null } if (a._added_events) return false; a._added_events = true; d("load", function () { if (h) { a._onbufferchange(0); a._whileloading(a.bytesTotal, a.bytesTotal, n()); a._onload(true) } }, false); d("canplay", function () { a._onbufferchange(0) },
                false); d("waiting", function () { a._onbufferchange(1) }, false); d("progress", function (g) { if (!a.loaded && h) { a._onbufferchange(0); a._whileloading(g.loaded || 0, g.total || 1, n()) } }, false); d("error", function () { h && a._onload(false) }, false); d("loadstart", function () { a._onbufferchange(1) }, false); d("play", function () { a._onbufferchange(0) }, false); d("playing", function () { a._onbufferchange(0) }, false); d("timeupdate", function () { a._onTimer() }, false); setTimeout(function () { a && h && d("ended", function () { a._onfinish() }, false) }, 250);
                return true
            }; this._whileloading = function (d, g, m, r) { a.bytesLoaded = d; a.bytesTotal = g; a.duration = Math.floor(m); a.bufferLength = r; if (a._iO.isMovieStar) a.durationEstimate = a.duration; else { a.durationEstimate = a._iO.duration ? a.duration > a._iO.duration ? a.duration : a._iO.duration : parseInt(a.bytesTotal / a.bytesLoaded * a.duration, 10); if (a.durationEstimate === undefined) a.durationEstimate = a.duration; a.bufferLength = r } a.readyState !== 3 && a._iO.whileloading && a._iO.whileloading.apply(a) }; this._onid3 = function (d, g) {
                var m = [], r,
                u; r = 0; for (u = d.length; r < u; r++) m[d[r]] = g[r]; a.id3 = s(a.id3, m); a._iO.onid3 && a._iO.onid3.apply(a)
            }; this._whileplaying = function (d, g, m, r, u) {
                if (isNaN(d) || d === null) return false; if (a.playState === 0 && d > 0) d = 0; a.position = d; a.processOnPosition(); if (o > 8 && !a.isHTML5) {
                    if (a._iO.usePeakData && typeof g !== "undefined" && g) a.peakData = { left: g.leftPeak, right: g.rightPeak }; if (a._iO.useWaveformData && typeof m !== "undefined" && m) a.waveformData = { left: m.split(","), right: r.split(",") }; if (a._iO.useEQData) if (typeof u !== "undefined" && u &&
                    u.leftEQ) { d = u.leftEQ.split(","); a.eqData = d; a.eqData.left = d; if (typeof u.rightEQ !== "undefined" && u.rightEQ) a.eqData.right = u.rightEQ.split(",") }
                } if (a.playState === 1) { !a.isHTML5 && b.flashVersion === 8 && !a.position && a.isBuffering && a._onbufferchange(0); a._iO.whileplaying && a._iO.whileplaying.apply(a); if ((a.loaded || !a.loaded && a._iO.isMovieStar) && a._iO.onbeforefinish && a._iO.onbeforefinishtime && !a.didBeforeFinish && a.duration - a.position <= a._iO.onbeforefinishtime) a._onbeforefinish() } return true
            }; this._onconnect = function (d) {
                d =
                d === 1; if (a.connected = d) { a.failures = 0; a._iO.onconnect && a._iO.onconnect.apply(a, [d]); if (p(a.sID) && (a.options.autoLoad || a.getAutoPlay())) a.play(undefined, a.getAutoPlay()) }
            }; this._onload = function (d) { d = d ? true : false; a.loaded = d; a.readyState = d ? 3 : 2; a._onbufferchange(0); a._iO.onload && a._iO.onload.apply(a, [d]); return true }; this._onfailure = function (d, g, m) { a.failures++; a._iO.onfailure && a.failures === 1 && a._iO.onfailure(a, d, g, m) }; this._onbeforefinish = function () {
                if (!a.didBeforeFinish) {
                    a.didBeforeFinish = true; a._iO.onbeforefinish &&
                    a._iO.onbeforefinish.apply(a)
                }
            }; this._onjustbeforefinish = function () { if (!a.didJustBeforeFinish) { a.didJustBeforeFinish = true; a._iO.onjustbeforefinish && a._iO.onjustbeforefinish.apply(a) } }; this._onstats = function (d) { a._iO.onstats && a._iO.onstats(a, d) }; this._onfinish = function () {
                a._onbufferchange(0); a.resetOnPosition(0); a._iO.onbeforefinishcomplete && a._iO.onbeforefinishcomplete.apply(a); a.didBeforeFinish = false; a.didJustBeforeFinish = false; if (a.instanceCount) {
                    a.instanceCount--; if (!a.instanceCount) {
                        a.playState =
                        0; a.paused = false; a.instanceCount = 0; a.instanceOptions = {}; e()
                    } if (!a.instanceCount || a._iO.multiShotEvents) a._iO.onfinish && a._iO.onfinish.apply(a)
                }
            }; this._onbufferchange = function (d) { if (a.playState === 0) return false; if (d && a.isBuffering || !d && !a.isBuffering) return false; a.isBuffering = d === 1; a._iO.onbufferchange && a._iO.onbufferchange.apply(a); return true }; this._ondataerror = function () { a.playState > 0 && a._iO.ondataerror && a._iO.ondataerror.apply(a) }
        }; fa = function () {
            return k.body ? k.body : k._docElement ? k.documentElement :
            k.getElementsByTagName("div")[0]
        }; z = function (c) { return k.getElementById(c) }; s = function (c, a) { var f = {}, i, e; for (i in c) if (c.hasOwnProperty(i)) f[i] = c[i]; i = typeof a === "undefined" ? b.defaultOptions : a; for (e in i) if (i.hasOwnProperty(e) && typeof f[e] === "undefined") f[e] = i[e]; return f }; (function () {
            function c(e) { e = Ca.call(e); var j = e.length; if (f) { e[1] = "on" + e[1]; j > 3 && e.pop() } else j === 3 && e.push(false); return e } function a(e, j) { var n = e.shift()[i[j]]; f ? n(e[0], e[1]) : n.apply(this, e) } var f = l.attachEvent, i = {
                add: f ? "attachEvent" :
                "addEventListener", remove: f ? "detachEvent" : "removeEventListener"
            }; y = function () { a(c(arguments), "add") }; v = function () { a(c(arguments), "remove") }
        })(); aa = function (c) { return (c.type ? R({ type: c.type }) : false) || R(c.url) }; R = function (c) {
            if (!b.useHTML5Audio || !b.hasHTML5) return false; var a, f = b.audioFormats; if (!x) { x = []; for (a in f) if (f.hasOwnProperty(a)) { x.push(a); if (f[a].related) x = x.concat(f[a].related) } x = RegExp("\\.(" + x.join("|") + ")", "i") } a = typeof c.type !== "undefined" ? c.type : null; c = typeof c === "string" ? c.toLowerCase().match(x) :
            null; if (!c || !c.length) { if (!a) return false } else c = c[0].substr(1); if (c && typeof b.html5[c] !== "undefined") return b.html5[c]; else { if (!a) if (c && b.html5[c]) return b.html5[c]; else a = "audio/" + c; a = b.html5.canPlayType(a); return b.html5[c] = a }
        }; Ba = function () {
            function c(n) {
                var h, d, g = false; if (!a || typeof a.canPlayType !== "function") return false; if (n instanceof Array) { h = 0; for (d = n.length; h < d && !g; h++) if (b.html5[n[h]] || a.canPlayType(n[h]).match(b.html5Test)) { g = true; b.html5[n[h]] = true } return g } else return (n = a && typeof a.canPlayType ===
                "function" ? a.canPlayType(n) : false) && (n.match(b.html5Test) ? true : false)
            } if (!b.useHTML5Audio || typeof Audio === "undefined") return false; var a = typeof Audio !== "undefined" ? new Audio : null, f, i = {}, e, j; e = b.audioFormats; for (f in e) if (e.hasOwnProperty(f)) { i[f] = c(e[f].type); if (e[f] && e[f].related) for (j = 0; j < e[f].related.length; j++) b.html5[e[f].related[j]] = i[f] } i.canPlayType = a ? c : null; b.html5 = s(b.html5, i); return true
        }; z = function (c) { return k.getElementById(c) }; H = function () { }; Y = function (c) {
            if (o === 8 && c.loops > 1 && c.stream) c.stream =
            false; return c
        }; Z = function (c) { if (c && !c.usePolicyFile && (c.onid3 || c.usePeakData || c.useWaveformData || c.useEQData)) c.usePolicyFile = true; return c }; ka = function (c) { typeof console !== "undefined" && typeof console.warn !== "undefined" && console.warn(c) }; qa = function () { return false }; wa = function (c) { for (var a in c) if (c.hasOwnProperty(a) && typeof c[a] === "function") c[a] = qa }; P = function (c) { if (typeof c === "undefined") c = false; if (A || c) b.disable(c) }; xa = function (c) {
            var a = null; if (c) if (c.match(/\.swf(\?\.*)?$/i)) {
                if (a = c.substr(c.toLowerCase().lastIndexOf(".swf?") +
                4)) return c
            } else if (c.lastIndexOf("/") !== c.length - 1) c += "/"; return (c && c.lastIndexOf("/") !== -1 ? c.substr(0, c.lastIndexOf("/") + 1) : "./") + b.movieURL
        }; da = function () {
            if (o !== 8 && o !== 9) b.flashVersion = 8; var c = b.debugMode || b.debugFlash ? "_debug.swf" : ".swf"; if (b.flashVersion < 9 && b.useHTML5Audio && b.audioFormats.mp4.required) b.flashVersion = 9; o = b.flashVersion; b.version = b.versionNumber + (C ? " (HTML5-only mode)" : o === 9 ? " (AS3/Flash 9)" : " (AS2/Flash 8)"); if (o > 8) {
                b.defaultOptions = s(b.defaultOptions, b.flash9Options); b.features.buffering =
                true
            } if (o > 8 && b.useMovieStar) { b.defaultOptions = s(b.defaultOptions, b.movieStarOptions); b.filePatterns.flash9 = RegExp("\\.(mp3|" + b.netStreamTypes.join("|") + ")(\\?.*)?$", "i"); b.mimePattern = b.netStreamMimeTypes; b.features.movieStar = true } else b.features.movieStar = false; b.filePattern = b.filePatterns[o !== 8 ? "flash9" : "flash8"]; b.movieURL = (o === 8 ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", c); b.features.peakData = b.features.waveformData = b.features.eqData = o > 8
        }; va = function (c, a) {
            if (!b.o || !b.allowPolling) return false;
            b.o._setPolling(c, a)
        }; (function () { function c(e) { e = Ca.call(e); var j = e.length; if (f) { e[1] = "on" + e[1]; j > 3 && e.pop() } else j === 3 && e.push(false); return e } function a(e, j) { var n = e.shift()[i[j]]; f ? n(e[0], e[1]) : n.apply(this, e) } var f = l.attachEvent, i = { add: f ? "attachEvent" : "addEventListener", remove: f ? "detachEvent" : "removeEventListener" }; y = function () { a(c(arguments), "add") }; v = function () { a(c(arguments), "remove") } })(); ha = function () {
            function c() { f.left = l.scrollX + "px"; f.top = l.scrollY + "px" } function a(i) {
                i = l[(i ? "add" : "remove") +
                "EventListener"]; i("resize", c, false); i("scroll", c, false)
            } var f = null; return { check: function (i) { f = b.oMC.style; if (t.match(/android/i)) { if (i) { if (b.flashLoadTimeout) b._s.flashLoadTimeout = 0; return false } f.position = "absolute"; f.left = f.top = "0px"; a(true); b.onready(function () { a(false); if (f) f.left = f.top = "-9999px" }); c() } return true } }
        }(); X = function (c, a) {
            var f = a ? a : b.url, i = b.altURL ? b.altURL : f, e; e = fa(); var j, n, h = I(), d, g = null; g = (g = k.getElementsByTagName("html")[0]) && g.dir && g.dir.match(/rtl/i); c = typeof c === "undefined" ?
            b.id : c; if (L && M) return false; if (C) { da(); b.oMC = z(b.movieID); V(); M = L = true; return false } L = true; da(); b.url = xa(this._overHTTP ? f : i); a = b.url; b.wmode = !b.wmode && b.useHighPerformance && !b.useMovieStar ? "transparent" : b.wmode; if (b.wmode !== null && !w && !b.useHighPerformance && navigator.platform.match(/win32/i)) { b.specialWmodeCase = true; b.wmode = null } e = {
                name: c, id: c, src: a, width: "100%", height: "100%", quality: "high", allowScriptAccess: b.allowScriptAccess, bgcolor: b.bgColor, pluginspage: "http://www.macromedia.com/go/getflashplayer",
                type: "application/x-shockwave-flash", wmode: b.wmode
            }; if (b.debugFlash) e.FlashVars = "debug=1"; b.wmode || delete e.wmode; if (w) {
                f = k.createElement("div"); n = '<object id="' + c + '" data="' + a + '" type="' + e.type + '" width="' + e.width + '" height="' + e.height + '"><param name="movie" value="' + a + '" /><param name="AllowScriptAccess" value="' + b.allowScriptAccess + '" /><param name="quality" value="' + e.quality + '" />' + (b.wmode ? '<param name="wmode" value="' + b.wmode + '" /> ' : "") + '<param name="bgcolor" value="' + b.bgColor + '" />' + (b.debugFlash ?
                '<param name="FlashVars" value="' + e.FlashVars + '" />' : "") + "<!-- --\></object>"
            } else { f = k.createElement("embed"); for (j in e) e.hasOwnProperty(j) && f.setAttribute(j, e[j]) } pa(); h = I(); if (e = fa()) {
                b.oMC = z(b.movieID) ? z(b.movieID) : k.createElement("div"); if (b.oMC.id) { d = b.oMC.className; b.oMC.className = (d ? d + " " : b.swfCSS.swfDefault) + (h ? " " + h : ""); b.oMC.appendChild(f); if (w) { j = b.oMC.appendChild(k.createElement("div")); j.className = b.swfCSS.swfBox; j.innerHTML = n } M = true; ha.check(true) } else {
                    b.oMC.id = b.movieID; b.oMC.className =
                    b.swfCSS.swfDefault + " " + h; j = h = null; if (!b.useFlashBlock) if (b.useHighPerformance) h = { position: "fixed", width: "8px", height: "8px", bottom: "0px", left: "0px", overflow: "hidden" }; else { h = { position: "absolute", width: "6px", height: "6px", top: "-9999px", left: "-9999px" }; if (g) h.left = Math.abs(parseInt(h.left, 10)) + "px" } if (t.match(/webkit/i)) b.oMC.style.zIndex = 1E4; if (!b.debugFlash) for (d in h) if (h.hasOwnProperty(d)) b.oMC.style[d] = h[d]; try {
                        w || b.oMC.appendChild(f); e.appendChild(b.oMC); if (w) {
                            j = b.oMC.appendChild(k.createElement("div"));
                            j.className = b.swfCSS.swfBox; j.innerHTML = n
                        } M = true
                    } catch (m) { throw Error(H("appXHTML")); } ha.check()
                }
            } return true
        }; p = this.getSoundById; O = function () { if (C) { X(); return false } if (b.o) return false; b.o = b.getMovie(b.id); if (!b.o) { if (Q) { if (w) b.oMC.innerHTML = ia; else b.oMC.appendChild(Q); Q = null; L = true } else X(b.id, b.url); b.o = b.getMovie(b.id) } b.oninitmovie instanceof Function && setTimeout(b.oninitmovie, 1); return true }; ca = function (c) { if (c) b.url = c; O() }; W = function () { setTimeout(ta, 500) }; ta = function () {
            if ($) return false;
            $ = true; v(l, "load", W); if (K && !na) return false; var c; q || (c = b.getMoviePercent()); setTimeout(function () { c = b.getMoviePercent(); if (!q && Ea) if (c === null) if (b.useFlashBlock || b.flashLoadTimeout === 0) b.useFlashBlock && ja(); else P(true); else b.flashLoadTimeout !== 0 && P(true) }, b.flashLoadTimeout)
        }; ca = function (c) { if (c) b.url = c; O() }; I = function () { var c = []; b.debugMode && c.push(b.swfCSS.sm2Debug); b.debugFlash && c.push(b.swfCSS.flashDebug); b.useHighPerformance && c.push(b.swfCSS.highPerf); return c.join(" ") }; ja = function () {
            H("fbHandler");
            var c = b.getMoviePercent(); if (b.supported()) { if (b.oMC) b.oMC.className = I() + " " + b.swfCSS.swfDefault + (" " + b.swfCSS.swfUnblocked) } else { if (J) b.oMC.className = I() + " " + b.swfCSS.swfDefault + " " + (c === null ? b.swfCSS.swfTimedout : b.swfCSS.swfError); b.didFlashBlock = true; E(true); b.onerror instanceof Function && b.onerror.apply(l) }
        }; B = function () { function c() { v(l, "focus", B); v(l, "load", B) } if (na || !K) { c(); return true } na = Ea = true; S && K && v(l, "mousemove", B); $ = false; c(); return true }; N = function (c) {
            if (q) return false; if (C) {
                q = true;
                E(); F(); return true
            } b.useFlashBlock && b.flashLoadTimeout && !b.getMoviePercent() || (q = true); if (A || c) { if (b.useFlashBlock) b.oMC.className = I() + " " + (b.getMoviePercent() === null ? b.swfCSS.swfTimedout : b.swfCSS.swfError); E(); b.onerror instanceof Function && b.onerror.apply(l); return false } if (b.waitForWindowLoad && !ra) { y(l, "load", F); return false } else F(); return true
        }; sa = function (c, a) { D.push({ method: c, scope: a || null, fired: false }) }; E = function (c) {
            if (!q && !c) return false; c = { success: c ? b.supported() : !A }; var a = [], f, i, e = !b.useFlashBlock ||
            b.useFlashBlock && !b.supported(); f = 0; for (i = D.length; f < i; f++) D[f].fired !== true && a.push(D[f]); if (a.length) { f = 0; for (i = a.length; f < i; f++) { a[f].scope ? a[f].method.apply(a[f].scope, [c]) : a[f].method(c); if (!e) a[f].fired = true } } return true
        }; F = function () { l.setTimeout(function () { b.useFlashBlock && ja(); E(); b.onload instanceof Function && b.onload.apply(l); b.waitForWindowLoad && y(l, "load", F) }, 1) }; Aa = function () {
            var c, a, f = !U.match(/usehtml5audio/i) && !U.match(/sm2\-ignorebadua/i) && S && t.match(/OS X 10_6_(3|4)/i); if (t.match(/iphone os (1|2|3_0|3_1)/i) ?
            true : false) { b.hasHTML5 = false; C = true; if (b.oMC) b.oMC.style.display = "none"; return false } if (b.useHTML5Audio) { if (!b.html5 || !b.html5.canPlayType) { b.hasHTML5 = false; return true } else b.hasHTML5 = true; if (f) { b.useHTML5Audio = false; b.hasHTML5 = false; return true } } else return true; for (a in b.audioFormats) if (b.audioFormats.hasOwnProperty(a) && b.audioFormats[a].required && !b.html5.canPlayType(b.audioFormats[a].type)) c = true; if (b.ignoreFlash) c = false; C = b.useHTML5Audio && b.hasHTML5 && !c; return c
        }; V = function () {
            var c, a = []; if (q) return false;
            if (b.hasHTML5) for (c in b.audioFormats) b.audioFormats.hasOwnProperty(c) && a.push(c + ": " + b.html5[c]); if (C) { if (!q) { v(l, "load", b.beginDelayedInit); b.enabled = true; N() } return true } O(); try { b.o._externalInterfaceTest(false); if (b.allowPolling) va(true, b.useFastPolling ? true : false); b.debugMode || b.o._disableDebug(); b.enabled = true } catch (f) { P(true); N(); return false } N(); v(l, "load", b.beginDelayedInit); return true
        }; ua = function () { if (la) return false; X(); O(); return la = true }; G = function () {
            if (ea) return false; ea = true; pa();
            Ba(); b.html5.usingFlash = Aa(); J = b.html5.usingFlash; ea = true; k.removeEventListener && k.removeEventListener("DOMContentLoaded", G, false); ca(); return true
        }; ya = function (c) { if (!c._hasTimer) c._hasTimer = true }; za = function (c) { if (c._hasTimer) c._hasTimer = false }; ga = function () { b.onerror instanceof Function && b.onerror(); b.disable() }; this._setSandboxType = function () { }; this._externalInterfaceOK = function () { if (b.swfLoaded) return false; (new Date).getTime(); b.swfLoaded = true; K = false; w ? setTimeout(V, 100) : V() }; ma = function () {
            if (k.readyState ===
            "complete") { G(); k.detachEvent("onreadystatechange", ma) } return true
        }; if (!b.hasHTML5 || J) { y(l, "focus", B); y(l, "load", B); y(l, "load", W); S && K && y(l, "mousemove", B) } if (k.addEventListener) k.addEventListener("DOMContentLoaded", G, false); else k.attachEvent ? k.attachEvent("onreadystatechange", ma) : ga(); k.readyState === "complete" && setTimeout(G, 100)
    } var Fa = null; if (typeof SM2_DEFER === "undefined" || !SM2_DEFER) Fa = new oa; T.SoundManager = oa; T.soundManager = Fa
})(window);