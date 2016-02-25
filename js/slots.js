
var CountOfStartReel = 0;
var FraseAnterior = 0;
var slotMachine = {
    stripHeight: 720,
    alignmentOffset: 86,
    firstReelStopTime: 667,
    secondReelStopTime: 575,
    thirdReelStopTime: 568,
    payoutStopTime: 700,
    reelSpeedDifference: 0,
    reelSpeed1Delta: 100,
    reelSpeed1Time: 0,
    reelSpeed2Delta: 100,
    positioningTime: 200,
    bounceHeight: 200,
    bounceTime: 1e3,
    //winningsFormatPrefix: "",
    //machine_name: "slotmachine1",
    //spinURL: "/Home/Spin",
    //curBet: 1,
    //soundEnabled: !0,
    //sounds: {},
    init: function () {
        //$("#betSpinUp").click(function ()
        //{
        //    slotMachine.change_bet(1)
        //}),
        //$("#betSpinDown").click(function ()
        //{
        //    slotMachine.change_bet(-1)
        //}),
        $("#spinButton").click(function () {
            console.log(CountOfStartReel);
            slotMachine.spin();
        })
        //,
        //$("#soundOffButton").click(function ()
        //{
        //    slotMachine.toggle_sound()
        //}),
        //slotMachine.soundEnabled && (soundManager.url = "/js/", soundManager.onload = function ()
        //{
        //    slotMachine.sounds.payout = soundManager.createSound({ id: "payout", url: "sounds/payout.mp3" }), slotMachine.sounds.fastpayout = soundManager.createSound({ id: "fastpayout", url: "sounds/fastpayout.mp3" }), slotMachine.sounds.spinning = soundManager.createSound({ id: "spinning", url: "sounds/spinning.mp3" })
        //})
        //slotMachine.soundEnabled
    },
    //change_bet: function (n)
    //{
    //    slotMachine.curBet += n,
    //    slotMachine.curBet = Math.min(Math.max(1, slotMachine.curBet), maxBet),
    //    slotMachine.show_won_state(!1),
    //    $("#bet").html(slotMachine.curBet),
    //    $("#prizes_list .tdPayout").each(function ()
    //    {
    //        var n = $(this); n.html((n.attr("data-payoutPrefix") || "") + parseInt(n.attr("data-basePayout"), 10) * slotMachine.curBet + (n.attr("data-payoutSuffix") || ""))
    //    })
    //},
    //toggle_sound: function ()
    //{
    //    $("#soundOffButton").hasClass("off") ? soundManager.unmute() : soundManager.mute(), $("#soundOffButton").toggleClass("off")
    //},
    spin: function () {
        //var n = parseInt($("#credits").html(), 10);
        debugger;
        if ($("#spinButton").hasClass("disabled")) return !1;
        console.log('a2'),
        slotMachine.show_won_state(!1),
        console.log('a3'),
        $("#spinButton").addClass("disabled"),
        console.log('a4'),
        $('.spinResult #result').html(""),
        console.log('a5'),
        //$("#credits").html(n - slotMachine.curBet),
        slotMachine._start_reel_spin(1, 0),
        slotMachine._start_reel_spin(2, slotMachine.secondReelStopTime),
        slotMachine._start_reel_spin(3, slotMachine.secondReelStopTime + slotMachine.thirdReelStopTime);
        console.log('a6');
        //try
        //{
        //    slotMachine.sounds.spinning.play()
        //}
        //catch (e)
        //{
        //}
        var t = function () {
            //for (i = 1; i < 3; i++) {
            //    var m;
            //    i == 1 ? m = s.reels_1 : i == 2 ? m = s.reels_2 : m = s.reels_3;
            //    switch (m) {
            //        case 1:
            //            h = 0.5;
            //            break;
            //        case 2:
            //            h = 0.8;
            //            break;
            //        case 3:
            //            h = 1;
            //            break;
            //        case 4:
            //            h = 1.3;
            //            break;
            //        case 5:
            //            h = 1.5;
            //            break;
            //        case 6:
            //            h = 1.7;
            //            break;
            //        default:
            //            h = 0;
            //            break;
            //    }
            //}

            var n = 0;
            window.setTimeout(function () {
                //slotMachine._stop_reel_spin(1, 1)
                slotMachine._stop_reel_spin(1, s.reels_1)
            }, n),
            n += slotMachine.secondReelStopTime,
            window.setTimeout(function () {
                //slotMachine._stop_reel_spin(2, 2)
                slotMachine._stop_reel_spin(2, s.reels_2)
            }, n),
            n += slotMachine.thirdReelStopTime,
            window.setTimeout(function () {
                //slotMachine._stop_reel_spin(3, 3)
                slotMachine._stop_reel_spin(3, s.reels_3)
            }, n),
            n += slotMachine.payoutStopTime,
            window.setTimeout(function () {
                slotMachine.end_spin(s)
            }, n)
        },
        i = !1,
        s = null;
        window.setTimeout(function () {
            i = !0, null != s && t()
        },
        slotMachine.firstReelStopTime),

        n = slotMachine.roundSpins();
        if (n != null && n != undefined) {
            return n.Success ? (s = n, void (1 == i && t())) : (slotMachine.abort_spin_abruptly(), "loggedOut" == n.error ? $("#loggedOutMessage").show() : alert(n.error), !1)
        } else {
            slotMachine.abort_spin_abruptly(), $("#failedRequestMessage").show()
        }

        //$.ajax(
        //    {
        //        url: slotMachine.spinURL,
        //        type: "POST",
        //        data:
        //          {
        //              bet: slotMachine.curBet, windowID: windowID, machine_name: slotMachine.machine_name
        //          },
        //        dataType: "json",
        //        timeout: 1e4,
        //        success: function (n)
        //        {
        //            return n.Success ? (s = n, void (1 == i && t())) : (slotMachine.abort_spin_abruptly(), "loggedOut" == n.error ? $("#loggedOutMessage").show() : alert(n.error), !1)
        //        },
        //        error: function ()
        //        {
        //            slotMachine.abort_spin_abruptly(), $("#failedRequestMessage").show()
        //        }
        //    })
    },
    show_won_state: function (n, e, t) {
        //n ? ($("#SlotsOuterContainer").addClass(t ? t : "won"), $("#trPrize_" + e).addClass("won")) : ($(".trPrize").removeClass("won"), $("#SlotsOuterContainer").removeClass(), $("#lastWin").html(""))
        //n ? ($("#SlotsOuterContainer").addClass(!t ? "" : "won"), $("#trPrize_" + e).addClass("won")) : ($(".trPrize").removeClass("won"), $("#SlotsOuterContainer").removeClass())
        n ? ($('.spinResult #result').html("GANASTE!"), CountOfStartReel = 0) : ($('.spinResult #result').html("PERDISTE"), CountOfStartReel += 1);
        slotMachine._end_spin_after_payout(n);
    },
    end_spin: function (n) {
        //null != n.prize_id ? (slotMachine.show_won_state(!0, n.prize_id, n.prize.winType), slotMachine._increment_payout_counter(n)) : slotMachine._end_spin_after_payout(n)
        (null != n.prize_id && n.prize_id > 0) ? (slotMachine.show_won_state(!0, n.prize_id, n.won)) : slotMachine._end_spin_after_payout(n)
    },
    roundSpins: function () {
        //Random rnd1 = new Random();
        //Random rnd2 = new Random();
        //Random rnd3 = new Random();
        //int prize_id = 0;
        //int prize_payoutCredits = 0;
        //int prize_payoutWinnings = 0;
        //bool won = false;
        var prize_id = 0;
        var prize_payoutCredits = 0;
        var prize_payoutWinnings = 0;
        var won = false;
        var frase_id = 0;
        var frase = "";

        //int reels_1 = rnd1.Next(1, 7);
        //int reels_2 = rnd1.Next(1, 7);
        //int reels_3 = rnd1.Next(1, 7);

        var reels_1 = Math.floor((Math.random() * 3) + 1);
        var reels_2 = Math.floor((Math.random() * 3) + 1);
        var reels_3 = Math.floor((Math.random() * 3) + 1);

        if (CountOfStartReel > 8) {
            reels_2 = reels_1;
            reels_3 = reels_1;
        }

        //1: banana
        //2: 7
        //3: sandia
        //4: bar
        //5: cereza
        //6: big win

        //1: madalena
        //2: budin
        //3: vainilla

        frase_id = Math.floor((Math.random() * 4) + 1);
        if (FraseAnterior == frase_id) {
            (frase_id < 4) ? (frase_id += 1) : (frase_id -= 1);
        }
        FraseAnterior = frase_id;
        console.log('frase' + frase_id);
        switch (frase_id) {
            case 1:
                frase = "¡Con Valente ganás cientos de miles de pesos en premios!"
                break;
            case 2:
                frase = "Comprá 25 cajas Valente y participá por cientos de pesos en premios Semanales!";
                break;
            case 3:
                frase = "Cuantas más cajas llevás, mas chances tenés de ganar!";
                break;
            case 4:
                frase = "Y en mayo jugá por el premio mayor!";
                break;
        }
        $('.frase span').html(frase);

        if (reels_1 == reels_2 && reels_2 == reels_3 && reels_3 == 1) //todos madalena
        {
            won = true;
            prize_id = 1;
            prize_payoutCredits = 1;
            prize_payoutWinnings = 1;
        }
        else if (reels_1 == reels_2 && reels_2 == reels_3 && reels_3 == 2) //todos budin
        {
            won = true;
            prize_id = 2;
            prize_payoutCredits = 2;
            prize_payoutWinnings = 2;
        }
        else if (reels_1 == reels_2 && reels_2 == reels_3 && reels_3 == 3) //todos vainilla
        {
            won = true;
            prize_id = 3;
            prize_payoutCredits = 3;
            prize_payoutWinnings = 3;
        }


        //if (reels_1 == reels_2 && reels_2 == reels_3 && reels_3 == 5) //todas cerezas
        //{
        //    won = true;
        //    prize_id = 34;
        //    prize_payoutCredits = 15;
        //    prize_payoutWinnings = 15;
        //}
        //else if (reels_1 == reels_2 && reels_2 == reels_3 && reels_3 == 6) //todos big win
        //{
        //    won = true;
        //    prize_id = 32;
        //    prize_payoutCredits = 200;
        //    prize_payoutWinnings = 200;
        //}
        //else if (reels_1 == reels_2 && reels_2 == reels_3 && reels_3 == 4) //todos bar
        //{
        //    won = true;
        //    prize_id = 33;
        //    prize_payoutCredits = 50;
        //    prize_payoutWinnings = 50;
        //}
        //else
        //if (reels_1 == reels_2 && reels_2 == reels_3 && reels_3 == 2) //todos 7
        //{
        //    won = true;
        //    prize_id = 37;
        //    prize_payoutCredits = 20;
        //    prize_payoutWinnings = 20;
        //}
        //else if (reels_1 == reels_2 && reels_2 == reels_3 && reels_3 == 3) //todos sandia
        //{
        //    won = true;
        //    prize_id = 35;
        //    prize_payoutCredits = 14;
        //    prize_payoutWinnings = 14;
        //}
        //else if (reels_1 == reels_2 && reels_2 == reels_3 && reels_3 == 1) //todos banana
        //{
        //    won = true;
        //    prize_id = 38;
        //    prize_payoutCredits = 12;
        //    prize_payoutWinnings = 12;
        //}
        //else if ((reels_1 == 1 || reels_1 == 3 || reels_1 == 5) && (reels_2 == 1 || reels_2 == 3 || reels_2 == 5) && (reels_3 == 1 || reels_3 == 3 || reels_3 == 5)) //todas frutas
        //{
        //    won = true;
        //    prize_id = 41;
        //    prize_payoutCredits = 7;
        //    prize_payoutWinnings = 7;
        //}



        //reels_1 = 5;
        //reels_2 = 5;
        //reels_3 = 5;
        var n = {
            Success: true,
            reels_1: reels_1,
            reels_2: reels_2,
            reels_3: reels_3,
            prize_id: prize_id,
            prize_payoutCredits: prize_payoutCredits,
            prize_payoutWinnings: prize_payoutWinnings,
            credits: 83,
            won: won
        };
        //n.Success = true;
        //n.reels_1 = reels_1;
        //n.reels_2 = reels_2;
        //n.reels_3 = reels_3;
        //n.prize_id = prize_id;
        //n.prize_payoutCredits = prize_payoutCredits;
        //n.prize_payoutWinnings = prize_payoutWinnings;
        //n.credits = 83;
        //n.won = won;
        return n;

    },
    //_format_winnings_number: function (n)
    //{
    //    return n == Math.floor(n) ? n : n.toFixed(2)
    //},
    _end_spin_after_payout: function (n) {
        //"undefined" != typeof n.credits && $("#credits").html(n.credits);
        //"undefined" != typeof n.dayWinnings && $("#dayWinnings").html(slotMachine.winningsFormatPrefix + slotMachine._format_winnings_number(n.dayWinnings)),
        //"undefined" != typeof n.lifetimeWinnings && $("#lifetimeWinnings").html(slotMachine.winningsFormatPrefix + slotMachine._format_winnings_number(n.lifetimeWinnings)),
        //"undefined" != typeof n.lastWin && $("#lastWin").html(n.lastWin);
        //var e = parseInt($("#credits").html(), 10);
        //e > 0 && $("#spinButton").removeClass("disabled")
        $("#spinButton").removeClass("disabled")
    },
    //_increment_payout_counter: function (n)
    //{
    //    var e = { credits: n.credits - n.prize_payoutCredits, 
    //        //dayWinnings: n.dayWinnings - n.prize_payoutWinnings, 
    //        //lifetimeWinnings: n.lifetimeWinnings - n.prize_payoutWinnings 
    //    }, 
    //    t = Math.max(n.credits - e.credits, 
    //        20
    //        //TODO REVISAR ESTO
    //        //n.dayWinnings - e.dayWinnings
    //        ), 
    //        i = t > 80 ? "fastpayout" : "payout", s = t > 80 ? 50 : 200;
    //    //try
    //    //{
    //    //    slotMachine.sounds[i].play({ onfinish: function () { this.play() } })
    //    //}
    //    //catch (o)
    //    //{ }
    //    var a = window.setInterval(function () {
    //        var t = !1; if ($.each(["credits", "dayWinnings", "lifetimeWinnings"], function (i, s) { e[s] < n[s] && (e[s] += 1, e[s] = Math.min(e[s], n[s]), $("#" + s).html("credits" != s ? slotMachine.winningsFormatPrefix + slotMachine._format_winnings_number(e[s]) : e[s]), t = !0) }), !t) {
    //            window.clearInterval(a);
    //                //try
    //                //{
    //                //    slotMachine.sounds[i].stop()
    //                //} catch (s)
    //                //{
    //                //}
    //                slotMachine._end_spin_after_payout(n)
    //        }
    //    }, s)
    //},
    abort_spin_abruptly: function () {
        slotMachine._stop_reel_spin(1, null),
        slotMachine._stop_reel_spin(2, null),
        slotMachine._stop_reel_spin(3, null);
        //try { slotMachine.sounds.spinning.stop() } catch (n) { }
    },
    _start_reel_spin: function (n, e) {
        var t = Date.now(), i = $("#reel" + n); i.css({ top: -(Math.random() * slotMachine.stripHeight * 2) });
        var s = parseInt(i.css("top"), 10),
        o = function () {
            i.css({ top: s }), s += Date.now() < t + slotMachine.reelSpeed1Time + e ? slotMachine.reelSpeed1Delta : slotMachine.reelSpeed2Delta, s += n * slotMachine.reelSpeedDifference, s > 0 && (s = 2 * -slotMachine.stripHeight)
        },
        a = window.setInterval(o, 20); i.data("spinTimer", a)
    },
    _stop_reel_spin: function (n, e) {
        var t = $("#reel" + n), i = t.data("spinTimer");
        if (window.clearInterval(i), t.data("spinTimer", null), null != e) {
            switch (e) {
                case 1:
                    h = 0.5;
                    break;
                case 2:
                    h = 0.8;
                    break;
                case 3:
                    h = 1;
                    break;
                    //case 4:
                    //    h = 1.3;
                    //    break;
                    //case 5:
                    //    h = 1.5;
                    //    break;
                    //case 6:
                    //    h = 1.7;
                    //    break;
                default:
                    h = 0;
                    break;
            }
            var s = slotMachine.stripHeight / window.numIconsPerReel,
                //o = -slotMachine.stripHeight - (e - 1) * s + slotMachine.alignmentOffset;
                o = -slotMachine.stripHeight - (e + h) * s + slotMachine.alignmentOffset;
            t.css({ top: o - slotMachine.stripHeight }).animate({ top: o + slotMachine.bounceHeight }, slotMachine.positioningTime, "linear", function () { t.animate({ top: o }, slotMachine.bounceTime, "easeOutElastic") })
        }
    }
};
slotMachine.init();