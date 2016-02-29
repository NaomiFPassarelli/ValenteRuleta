var CountOfStartReel = 0;
var FraseAnterior = 0;
var slotMachine = {
    stripHeight: 720,
    //stripHeight: 330,
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
    init: function () {
        $("#spinButton").click(function () {
            //console.log(CountOfStartReel);
            slotMachine.spin();
        })
    },
    spin: function () {
        if ($("#spinButton").hasClass("disabled")) return !1;
        slotMachine.show_won_state(!1),
        $("#spinButton").addClass("disabled"),
        $('.spinResult #result').html(""),
        slotMachine._start_reel_spin(1, 0),
        slotMachine._start_reel_spin(2, slotMachine.secondReelStopTime),
        slotMachine._start_reel_spin(3, slotMachine.secondReelStopTime + slotMachine.thirdReelStopTime);
        var t = function () {
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

    },
    show_won_state: function (n, e, t) {
        n ? ($('.spinResult #result').html("GANASTE!"), CountOfStartReel = 0) : ($('.spinResult #result').html("PERDISTE"), CountOfStartReel += 1);
        slotMachine._end_spin_after_payout(n);
    },
    show_lose_state: function () {
        $('.spinResult #result').html("PERDISTE");
        CountOfStartReel += 1;
        slotMachine._end_spin_after_payout(n);
    },
    end_spin: function (n) {
        (null != n.prize_id && n.prize_id > 0) ? (slotMachine.show_won_state(!0, n.prize_id, n.won)) : (slotMachine.show_lose_state())
    },
    roundSpins: function () {
        var prize_id = 0;
        var prize_payoutCredits = 0;
        var prize_payoutWinnings = 0;
        var won = false;
        var frase_id = 0;
        var frase = "";

        var reels_1 = Math.floor((Math.random() * 3) + 1);
        var reels_2 = Math.floor((Math.random() * 3) + 1);
        var reels_3 = Math.floor((Math.random() * 3) + 1);

        if (CountOfStartReel > 8) {
            reels_2 = reels_1;
            reels_3 = reels_1;
        }

        //1: madalena
        //2: budin
        //3: vainilla

        frase_id = Math.floor((Math.random() * 4) + 1);
        if (FraseAnterior == frase_id) {
            (frase_id < 4) ? (frase_id += 1) : (frase_id -= 1);
        }
        FraseAnterior = frase_id;
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

        //reels_1 = 1;
        //reels_2 = 2;
        //reels_3 = 3;

        console.log(reels_1);
        console.log(reels_2);
        console.log(reels_3);
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
        return n;

    },
    _end_spin_after_payout: function (n) {
        $("#spinButton").removeClass("disabled")
    },
    abort_spin_abruptly: function () {
        slotMachine._stop_reel_spin(1, null),
        slotMachine._stop_reel_spin(2, null),
        slotMachine._stop_reel_spin(3, null);
    },
    _start_reel_spin: function (n, e) {
        var t = Date.now(), i = $("#reel" + n); i.css({ top: -(Math.random() * slotMachine.stripHeight * 2) });
        var s = parseInt(i.css("top"), 10),
        o = function () {
            i.css({ top: s }), s += Date.now() < t + slotMachine.reelSpeed1Time + e ? slotMachine.reelSpeed1Delta : slotMachine.reelSpeed2Delta, s += n * slotMachine.reelSpeedDifference, s > 0 && (s = 2 * -slotMachine.stripHeight)
        },
        a = window.setInterval(o, 20);
        i.data("spinTimer", a);
    },
    _stop_reel_spin: function (n, e) {
        var t = $("#reel" + n), i = t.data("spinTimer");
        if (window.clearInterval(i), t.data("spinTimer", null), null != e) {
            if ($('body').width() <= 1111) { //totemMin
                switch (e) {
                    case 1:
                        h = 1.2;
                        break;
                    case 2:
                        h = 0.9;
                        break;
                    case 3:
                        h = 0.5;
                        break;
                }
            } else if ($('body').width() <= 1280) { //totem
                switch (e) {
                    case 1:
                        h = 0.5;
                        break;
                    case 2:
                        h = 0.6;
                        break;
                    case 3:
                        h = 0.5;
                        break;
                }
            } else if ($('body').width() > 1366) { //tele chica
                switch (e) {
                    case 1:
                        h = 1.1;
                        break;
                    case 2:
                        h = 0.8;
                        break;
                    case 3:
                        h = 0.4;
                        break;
                }
            }

            var s = slotMachine.stripHeight / window.numIconsPerReel,
                //o = -slotMachine.stripHeight - (e - 1) * s + slotMachine.alignmentOffset;
                o = -slotMachine.stripHeight - (e + h) * s + slotMachine.alignmentOffset;
            //t.css({ top: o - slotMachine.stripHeight }).animate({ top: o + slotMachine.bounceHeight }, slotMachine.positioningTime, "linear", function () { t.animate({ top: o }, slotMachine.bounceTime, "easeOutElastic") });
            t.css({ top: o + slotMachine.bounceHeight }).animate({ top: o + slotMachine.bounceHeight }, slotMachine.positioningTime, "linear", function () { t.animate({ top: o }, slotMachine.bounceTime, "easeOutElastic") }); //tele

            //console.log(".....");
            //console.log(e);
            //console.log(h);
            //console.log(s);
            //console.log(o);
            //console.log(o - slotMachine.stripHeight);
            //console.log(o + slotMachine.bounceHeight);
            //console.log(slotMachine.stripHeight);
            //console.log(slotMachine.bounceHeight);
            //console.log(slotMachine.alignmentOffset);
            //console.log(slotMachine.positioningTime);

        }
    }
};
slotMachine.init();