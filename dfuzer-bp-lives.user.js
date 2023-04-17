// ==UserScript==
// @name         dFuZer's Bombparty letters
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @description  Allowing the player to see the letters with the old bombparty letters arrangement. NOT COMPATIBLE WITH MACA'S OVERLAY.
// @author       Enzo (dFuZer)
// @include      https://*.jklm.fun/*
// @exclude      https://jklm.fun/*
// @grant        none
// @icon         https://raw.githubusercontent.com/dFuZer/bp-letters/master/icon.jpg

// ==/UserScript==
(function () {
    "use strict";
    let start = () => {
        let letterDone = "#363636"; // Placed letter's character color
        let letterTodo = "#141414"; // Not placed letter's character color
        let rectDone = "#5c5c5c"; // Placed letter's frame

        let wMap = {
            "en": {
                a: 1.4390598159923016,
                m: 3.819048641939949,
                k: 11.997038425492034,
                i: 1.2313188483307105,
                h: 4.210470226034786,
                s: 1.1666952245194078,
                v: 12.394306738962046,
                f: 9.52641919447504,
                r: 1.6300988182559086,
                d: 3.422647886118865,
                w: 14.33336319254714,
                o: 1.6282907122286785,
                n: 1.6727001881664227,
                t: 1.6997710771061172,
                l: 2.1665493196127548,
                e: 1,
                c: 2.7850435569634575,
                b: 5.899330838571719,
                g: 4.118621381964196,
                y: 6.873746160620315,
                p: 3.635569440499858,
                u: 3.4563235770601577,
                j: 64.54638967325535,
                x: 38.74815352948299,
                z: 22.9455079945508,
                q: 65.8750514615068,
            },
            "fr": {
                a: 1.5277617048102576,
                b: 9.922832826392138,
                s: 1.4543960048010973,
                c: 4.151552787430865,
                o: 2.3415195516846334,
                t: 2.122539052969402,
                e: 1,
                u: 3.9367795086009343,
                p: 5.985384140425157,
                r: 1.7496538405010482,
                i: 1.5315720573298726,
                l: 3.553113725736607,
                v: 16.27366477204595,
                n: 1.9892499596910134,
                d: 6.33324622233837,
                h: 10.695126564322416,
                m: 5.579599555975825,
                z: 15.014781050162636,
                g: 8.918837569990274,
                j: 87.08457392197126,
                q: 24.640968843053237,
                f: 11.795146795529211,
                x: 51.55078629491757,
                y: 29.546416441696422,
                k: 129.02890283323825,
                w: 444.66775884665793,
            },
            "es": {
                a: 1,
                r: 1.847216918859405,
                e: 1.4164459750978504,
                o: 2.3862130746856303,
                n: 2.6414315900816088,
                i: 2.0658695248363173,
                c: 3.727785399093966,
                s: 1.724055544634995,
                t: 4.013807293197555,
                b: 7.257233385580991,
                l: 4.5286420727407055,
                m: 4.802285414125587,
                d: 4.579781453242541,
                h: 17.01354718647489,
                j: 28.10313387344674,
                g: 11.69400121406582,
                x: 108.78239386911365,
                k: 660.2172582619339,
                u: 6.119225620547262,
                z: 19.787868227007593,
                q: 44.607798544492226,
                y: 117.06945198046662,
                v: 21.224423546076967,
                p: 7.9184007516203145,
                f: 17.99191127418279,
                w: 2252.1816283924845,
            },
            "de": {
                a: 2.0297609405012613,
                c: 4.256017080745342,
                h: 3.1389306420442344,
                e: 1,
                n: 1.625486489491827,
                r: 1.900745492371706,
                i: 2.045333706450259,
                s: 1.7033325565136332,
                d: 5.497555471981948,
                k: 6.50508047170511,
                b: 5.546926385024032,
                l: 3.354034416826004,
                u: 3.0951759184105585,
                t: 2.13028271640921,
                f: 6.149337446539999,
                o: 3.8972672739391245,
                m: 5.303101759477598,
                g: 3.787210155878924,
                w: 13.341648919987831,
                q: 89.22482197355036,
                p: 8.130144605116797,
                j: 42.207892204042345,
                v: 13.522664199814987,
                z: 10.884586746090841,
                x: 44.05223505775992,
                y: 22.996329313057156,
            },
            "it": {
                a: 1,
                b: 4.719155064810369,
                n: 2.070127408655365,
                e: 1.310928852437154,
                s: 2.4334694887981185,
                o: 1.348700006860122,
                t: 2.183959120195512,
                j: 78.64,
                u: 2.954613766155696,
                r: 2.103348668021825,
                d: 4.485512206251426,
                i: 1.1102326632030721,
                g: 4.854320987654321,
                m: 3.9147749900438074,
                v: 7.792310741181134,
                c: 2.6269374665954035,
                f: 6.391417425227568,
                l: 2.7267683772538143,
                z: 6.343981929654728,
                k: 18.477443609022558,
                h: 9.613691931540343,
                p: 4.927318295739348,
                q: 30.527950310559007,
                y: 31.658615136876005,
                x: 46.58767772511848,
                w: 41.91897654584222,
            },
            "pt-BR": {
                a: 1,
                b: 6.660827544548475,
                c: 3.298534250673048,
                x: 17.930081300813008,
                i: 1.7549136627675659,
                s: 1.8458319383997321,
                f: 9.428815733219324,
                r: 2.455902004454343,
                e: 1.5353661932609302,
                v: 9.392674616695059,
                m: 3.5376965030478025,
                o: 1.584452906099576,
                u: 3.0831818817279464,
                n: 3.402344955260722,
                d: 3.8738802037590023,
                l: 4.693339008299638,
                z: 14.5667107001321,
                t: 3.9909518639160333,
                h: 13.940581542351454,
                q: 18.801364023870416,
                j: 17.728295819935692,
                g: 8.0254730713246,
                p: 7.181374145229567,
                w: 1470.2666666666667,
                k: 1160.7368421052631,
                y: 7351.333333333333,
            },
        };

        let wc = valueMap(rules.dictionaryId.value);

        window.screenprop = 0.6;

        function defaultvMap() {
            let o = {};
            let l = Object.entries(rules.customBonusAlphabet.value)
                .filter((x) => x[1] > 0)
                .map((x) => x[0]);
            for (let i of l) {
                o[i] = 1;
            }
            return o;
        }

        function vMap(wm) {
            let v = Object.assign({}, wm);
            for (let i in v) v[i] = Math.min(Math.round(v[i] ** 0.65 * 20), 240);
            return v;
        }

        function valueMap(d) {
            let v;
            window.gameBl = Object.entries(rules.customBonusAlphabet.value)
                .filter((x) => x[1] > 0)
                .map((x) => x[0]);
            if (wMap[d]) {
                v = vMap(wMap[d]);
            } else {
                v = defaultvMap();
            }
            if (wMap[d]) {
                window.gameBl.sort((a, b) => wMap[d][b] - wMap[d][a]);
            } else {
                window.gameBl.sort();
            }
            return v;
        }

        socket.on("setRules", function (d) {
            let l = rules.dictionaryId.value;
            wc = valueMap(l);
            if (wMap[l]) {
                window.gameBl.sort((a, b) => wMap[l][b] - wMap[l][a]);
            } else {
                window.gameBl.sort();
            }
        });

        window.animate = (animateTime) => {
            requestAnimationFrame(animate);

            const elapsedAnimateTime = previousAnimateTime > 0 ? animateTime - previousAnimateTime : 0;
            previousAnimateTime = animateTime;

            const canvasRect = canvas.getBoundingClientRect();
            const canvasWidth = canvasRect.width;
            const canvasHeight = canvasRect.height;

            let rectSize = Math.round((canvasHeight / 7) * window.screenprop); // Frame's size in pixels
            let lettersOffset = (rectSize + 8) * 2 + 20; // Offset from the border in pixels, to bring the letters closer to eyesight
            let lettersYOffset = (canvasHeight - (window.gameBl.length / 3) * (rectSize + 8)) / 2 - 5;
            let lettersStyle = `bold ${Math.max(10, rectSize / 1.5)}px "Lato"`; // Letters style
            let lettersCountStyle = `bold ${Math.max(4, rectSize / 4)}px "Lato"`;

            if (dpr > 1 && !document.hidden && elapsedAnimateTime > 1000 / 20) {
                accumulatedSlowFrames++;
                if (accumulatedSlowFrames > 5) {
                    console.log("Game is running slowly, downgrading to non-high-density rendering.");
                    dpr = 1;
                }
            } else {
                accumulatedSlowFrames = 0;
            }

            canvas.width = Math.round(canvasWidth * dpr);
            canvas.height = Math.round(canvasHeight * dpr);

            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            const isLogoVisible = milestone.name === "seating" && milestone.lastRound == null && players.length === 0;

            if (isLogoVisible) {
                ctx.save();
                ctx.translate(canvasWidth / 2, canvasHeight / 2);
                const scale = Math.min(0.5, canvasWidth / logo.width);
                ctx.scale(scale, scale);
                if (logo.complete) jklmGfx.draw(ctx, logo);
                ctx.restore();
            }

            ctx.font = `1em "Lato"`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            let angle = 0;
            const maxRadius = 250;
            const radius = Math.max(50, Math.min(maxRadius, canvasWidth / 2 - 60, canvasHeight / 2 - 100));
            const scale = Math.max(0.5, radius / maxRadius);
            const playerScale = 1 + Math.min(scale, 1 / Math.max(1, players.length - 4));
            const avatarSize = 40 * scale;

            ctx.save();
            ctx.translate(canvasWidth / 2, canvasHeight / 2);
            ctx.scale(scale, scale);

            if (milestone.name === "round") {
                if (animateBackground != null) {
                    ctx.save();
                    animateBackground(elapsedAnimateTime, canvasWidth, canvasHeight, scale);
                    ctx.restore();
                }

                statsTimerTd.textContent = jklmMath.formatSeconds(jklmMath.secondsSince(milestone.startTime + serverToLocalNow));

                ctx.save();
                lerpArrowAngle = jklmMath.lerpAngle(lerpArrowAngle, arrowAngle, 0.15);
                ctx.rotate(lerpArrowAngle);
                if (arrow.complete) jklmGfx.draw(ctx, arrow);
                ctx.restore();
            }

            if (!isLogoVisible && milestone.lastRound == null && bomb.complete) {
                if (milestone.name === "round") {
                    // Pulse
                    bombPulseTimer++;
                    const pulse = (bombPulseTimer % 20) / 20;
                    const bombScale = 1.05 - 0.05 * pulse * pulse;
                    ctx.scale(bombScale, bombScale);
                    jklmGfx.draw(ctx, bomb);

                    // Spark
                    ctx.save();
                    ctx.translate(50, -65);
                    ctx.rotate(Math.random() * Math.PI * 2);
                    const sparkScale = 0.8 + 0.4 * Math.random();
                    ctx.scale(sparkScale, sparkScale);
                    if (spark.complete) jklmGfx.draw(ctx, spark);
                    ctx.restore();
                } else {
                    jklmGfx.draw(ctx, bomb);
                }
            }

            if (explosionStartTime !== 0) {
                const explosionTime = Date.now() - explosionStartTime;
                if (explosionTime > explosionDuration) {
                    explosionStartTime = 0;
                } else {
                    const progress = explosionTime / explosionDuration;
                    const anim = 1 - Math.pow(progress, 5);
                    ctx.save();
                    ctx.scale(2 + anim * 2, 2 + anim * 2);
                    ctx.font = `4em "Lato"`;
                    ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * (1 - progress)})`;
                    ctx.rotate(Math.random() * Math.PI * 2);
                    ctx.fillText("💥", 0, 0);
                    ctx.restore();
                }
            }

            ctx.restore();

            // Bonus alphabet
            if (milestone.name === "round") {
                // Tweak that makes you see the current player's letters instead of seeing nothing when you're not playing.
                const selfPlayerState =
                    milestone.playerStatesByPeerId[selfPeerId] !== undefined ? milestone.playerStatesByPeerId[selfPeerId] : milestone.playerStatesByPeerId[milestone.currentPlayerPeerId];
                // const selfPlayerState = milestone.playerStatesByPeerId[selfPeerId];

                if (selfPlayerState != null && radius > 50) {
                    const letterSize = rectSize;
                    const letterSpacing = 8;

                    ctx.textAlign = "center";
                    ctx.save();
                    ctx.translate(canvasWidth - letterSize - letterSpacing, letterSpacing);

                    ctx.translate(letterSize / 2, letterSize / 2);
                    let l = 0;

                    for (const letter of window.gameBl) {
                        let v = wc[letter];
                        let rectTodo = `rgb(255, ${255 - v}, ${255 - v})`; // Not placed letter's frame

                        ctx.save();

                        //ctx.translate(l % 2 == 1 ? -lettersOffset : (0 - letterSize - letterSpacing) - lettersOffset, Math.floor(l / 2) * (letterSize + letterSpacing));
                        ctx.translate(-(l % 3) * (0 - letterSize - letterSpacing) - lettersOffset, Math.floor(l / 3) * (letterSize + letterSpacing) + lettersYOffset);
                        ctx.fillStyle = selfPlayerState.bonusLetters[letter] > 0 ? rectTodo : rectDone;
                        ctx.fillRect(-letterSize / 2, -letterSize / 2, letterSize, letterSize);

                        ctx.font = lettersStyle;
                        ctx.fillStyle = selfPlayerState.bonusLetters[letter] > 0 ? letterTodo : letterDone;
                        ctx.fillText(letter.toUpperCase(), 0, 0);
                        ctx.font = lettersCountStyle;
                        ctx.fillText(selfPlayerState.bonusLetters[letter], -letterSize / 3, letterSize / 3);
                        ctx.restore();

                        l++;
                    }

                    ctx.restore();
                }
            }

            // Players
            const skipDrawingOtherPlayers = radius <= 50;

            function setupCtxforPlayer(i) {
                angle = (i / players.length) * Math.PI * 2;

                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                ctx.save();
                ctx.translate(canvasWidth / 2 + x, canvasHeight / 2 + y);
                ctx.scale(playerScale, playerScale);
            }

            function drawPlayerAvatars() {
                ctx.fillStyle = "#888";
                ctx.shadowColor = "rgba(0,0,0,0.5)";
                ctx.shadowBlur = 2;
                ctx.font = `1.25em "Lato"`;

                for (let i = 0; i < players.length; i++) {
                    const player = players[i];

                    setupCtxforPlayer(i);

                    ctx.save();

                    const { animation } = playersByPeerId[player.profile.peerId];
                    let animProgress = 0;
                    if (animation != null) {
                        animProgress = (Date.now() - animation.startTime) / animation.duration;
                        if (animProgress < 1) {
                            switch (animation.type) {
                                case "join": {
                                    const smoothDecay = Math.pow(1.0 - animProgress, 3);
                                    const scale = 1 - 0.5 * smoothDecay;
                                    ctx.scale(scale, scale);
                                    ctx.rotate((Math.PI / 4) * smoothDecay);
                                    break;
                                }

                                case "failWord_mustContainSyllable":
                                case "failWord_notInDictionary":
                                case "failWord_alreadyUsed": {
                                    const x = 10 * (1.0 - animProgress);
                                    ctx.translate(Math.cos(animProgress * 20) * x, 0);
                                    break;
                                }

                                case "correct": {
                                    const smoothDecay = Math.pow(1.0 - animProgress, 3);
                                    const scale = 1 + 0.3 * smoothDecay;
                                    ctx.scale(scale, scale);
                                    ctx.rotate(animation.angle * smoothDecay);
                                    break;
                                }

                                case "woo": {
                                    const smoothDecay = Math.pow(1.0 - animProgress, 3);
                                    const scale = 1 + 0.3 * smoothDecay;
                                    ctx.scale(1, scale);

                                    ctx.rotate(Math.PI * 2 * (1.0 - smoothDecay));
                                    break;
                                }

                                case "loseLife": {
                                    const scale = 1 - 0.2 * Math.pow(1.0 - animProgress, 3);
                                    ctx.scale(1, scale);

                                    const x = 10 * (1.0 - animProgress);
                                    const y = 10 * Math.pow(1.0 - animProgress, 2);
                                    ctx.translate(Math.cos(animProgress * 20) * x, y);
                                    break;
                                }
                            }
                        } else playersByPeerId[player.profile.peerId].animation = null;
                    }

                    if (player.image.src.length && player.image.complete) {
                        ctx.drawImage(player.image, -avatarSize / 2, -avatarSize / 2, avatarSize, avatarSize);
                    } else {
                        ctx.fillRect(-avatarSize / 2, -avatarSize / 2, avatarSize, avatarSize);
                        ctx.save();
                        ctx.globalAlpha = 0.5;
                        ctx.scale(scale, scale);
                        ctx.fillText("👤", 0, 0);
                        ctx.restore();
                    }

                    ctx.restore();

                    if (animation != null) {
                        const factor = 1.0 - Math.pow(1.0 - animProgress, 2);

                        switch (animation.type) {
                            case "loseLife":
                                const playerState = milestone.playerStatesByPeerId[player.profile.peerId];
                                ctx.fillStyle = playerState.lives > 0 ? `rgba(255, ${Math.floor(255 * (1 - factor))}, 0, ${0.5 - factor * 0.5})` : `rgba(0, 0, 0, ${0.5 - factor * 0.5})`;
                                ctx.scale(1 + factor, 1 + factor);
                                ctx.beginPath();
                                ctx.arc(0, 0, avatarSize, 0, Math.PI * 2);
                                ctx.fill();
                                if (playerState.lives === 0) {
                                    ctx.scale(3, 3);
                                    ctx.fillText("☠", 0, 0);
                                } else {
                                    ctx.fillText("💔", 0, -avatarSize * (0.5 + factor / 2));
                                }
                                break;

                            case "correct":
                                ctx.fillStyle = `rgba(64, ${64 + Math.floor(192 * factor)}, 64, ${0.5 - factor * 0.5})`;
                                ctx.scale(1 + factor, 1 + factor);
                                ctx.beginPath();
                                ctx.arc(0, 0, avatarSize, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillText("✔️", 0, -avatarSize * (0.5 + factor / 2));
                                break;

                            case "failWord_mustContainSyllable":
                            case "failWord_notInDictionary":
                            case "failWord_alreadyUsed":
                                ctx.fillStyle = `rgba(255, 255, 255, ${0.5 - factor * 0.5})`;
                                ctx.scale(1 + factor, 1 + factor);
                                ctx.fillText(animation.type === "failWord_alreadyUsed" ? "🔒" : "❌", 0, -avatarSize * (0.5 + factor / 2));
                                break;

                            case "woo":
                                ctx.fillStyle = `rgba(255, 255, 255, ${0.5 - factor * 0.5})`;
                                ctx.scale(1 + factor, 1 + factor);
                                ctx.beginPath();
                                ctx.arc(0, 0, avatarSize, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillText("💖", 0, -avatarSize * (0.5 + factor / 2));
                                break;
                        }
                    }

                    ctx.restore();
                }
            }

            function drawPlayerHearts() {
                if (milestone.name !== "round") return;

                ctx.font = `${0.7 / scale}em "Lato"`;

                for (let i = 0; i < players.length; i++) {
                    const player = players[i];

                    setupCtxforPlayer(i);
                    ctx.scale(scale, scale);
                    const playerState = milestone.playerStatesByPeerId[player.profile.peerId];

                    const hearts = playerState.lives > 0 ? (playerState.hasBirthday ? "🍰" : "❤️").repeat(playerState.lives) : "☠️";
                    ctx.fillText(hearts, 0, -20);
                    ctx.restore();
                }
            }

            function drawPlayerNames() {
                ctx.globalAlpha = 1.0;
                ctx.shadowColor = "black";
                ctx.shadowBlur = 4;
                ctx.textAlign = "center";

                for (let i = 0; i < players.length; i++) {
                    const player = players[i];
                    if (skipDrawingOtherPlayers && player.profile.peerId !== selfPeerId) continue;

                    setupCtxforPlayer(i);

                    ctx.font = `${player.isOnline ? "" : "italic "}0.75em "Lato"`;
                    ctx.fillStyle = player.isOnline ? "#fff" : "#888";

                    let nickname = player.profile.nickname;
                    if (nickname.length > 1 && ctx.measureText(nickname).width > 100 * scale) {
                        const nicknameCodepoints = Array.from(nickname);
                        while (nicknameCodepoints.length > 1 && ctx.measureText(nicknameCodepoints.join("")).width > 100 * scale) nicknameCodepoints.splice(nicknameCodepoints.length - 1);
                        nickname = nicknameCodepoints.join("") + "…";
                    }

                    if (milestone.name === "round" && milestone.playerStatesByPeerId[player.profile.peerId].hasBirthday) {
                        nickname = `🥳 ${nickname}`;
                    }

                    ctx.fillText(nickname, 0, -avatarSize / 2 - 15);

                    ctx.restore();
                }

                ctx.shadowColor = "transparent";
            }

            function drawPlayerWords() {
                if (milestone.name !== "round") return;

                ctx.shadowColor = "black";
                ctx.shadowBlur = 2;
                ctx.textAlign = "left";

                for (let i = 0; i < players.length; i++) {
                    const player = players[i];
                    const isCurrentPlayer = player.profile.peerId === milestone.currentPlayerPeerId;
                    if (skipDrawingOtherPlayers && !isCurrentPlayer) continue;

                    setupCtxforPlayer(i);

                    ctx.font = (isCurrentPlayer ? "bold " : "") + `0.75em "Lato"`;
                    const wordFillStyle = isCurrentPlayer ? "#fff" : "#aaa";
                    ctx.fillStyle = wordFillStyle;

                    const { word, syllable, wasWordValidated } = milestone.playerStatesByPeerId[player.profile.peerId];

                    const syllableIndex = syllable != null ? word.indexOf(syllable) : -1;
                    const wordWidth = ctx.measureText(word.toUpperCase()).width;
                    let wordX = -wordWidth / 2;

                    const wordY = 0 + avatarSize / 2 + 15;

                    if (syllableIndex !== -1) {
                        const before = word.substring(0, syllableIndex);
                        const after = word.substring(syllableIndex + syllable.length);

                        ctx.fillText(before.toUpperCase(), wordX, wordY);

                        wordX += ctx.measureText(before.toUpperCase()).width;
                        ctx.fillStyle = "#4d4";
                        ctx.fillText(syllable.toUpperCase(), wordX, wordY);

                        wordX += ctx.measureText(syllable.toUpperCase()).width;
                        ctx.fillStyle = wordFillStyle;
                        ctx.fillText(after.toUpperCase(), wordX, wordY);
                    } else {
                        ctx.fillText(word.toUpperCase(), wordX, wordY);
                    }

                    if (!isCurrentPlayer && !wasWordValidated) ctx.fillRect(-wordWidth / 2, wordY - 1, wordWidth, 2);

                    ctx.restore();
                }
            }

            drawPlayerAvatars();
            drawPlayerHearts();
            drawPlayerNames();
            drawPlayerWords();
        };

        milestone.lastExplosion = Date.now();

        if (milestone.name === "round") {
            startTick();
        }

        socket.on("setup", function (data) {
            if (data.milestone.name === "round") {
                startTick();
            } else {
                if (tickSource != null) {
                    tickSource.stop();
                    tickSource = null;
                }
            }
        });

        socket.on("livesLost", function () {
            milestone.lastExplosion = Date.now();
            updateTime();
        });

        socket.on("correctWord", function () {
            updateTime();
        });

        socket.on("setMilestone", (nms, svnow) => {
            if (nms.name == "round") {
                milestone.lastExplosion = Date.now();
                startTick();
            }
        });

        function startTick() {
            if (tickSource == null) tickSource = jklmAudio.play("tick", { loop: true });
            updateTime();
        }

        function updateTime() {
            if (tickSource != null) {
                tickSource.playbackRate.value = (Date.now() - milestone.lastExplosion) / (1000 * 60 * 5) + 1;
            }
            //if (tickSource != null) { tickSource.playbackRate.value = (Date.now() - milestone.lastExplosion)/(1000*1*20)*20 + 1; }
        }

        window.round_render = function () {
            milestone.playerStatesByPeerId[milestone.currentPlayerPeerId].syllable = milestone.syllable;

            $hide(".top");
            $(".middle .round .syllable").textContent = milestone.syllable;

            const isSelfTurn = milestone.currentPlayerPeerId === selfPeerId;

            $(".bottom .round .otherTurn .player").textContent = playersByPeerId[milestone.currentPlayerPeerId].profile.nickname;
            $show(".bottom .round .otherTurn", !isSelfTurn);
            $show(".bottom .round .selfTurn", isSelfTurn);

            if (!wasSelfTurn && isSelfTurn) jklmAudio.play("selfTurn");
            wasSelfTurn = isSelfTurn;

            if (isSelfTurn) {
                if (!isLargeScreen()) showRules = false;
                clearFocusChatTimeout();
                parentWindow.postMessage({ name: "focusGameWindow" }, "*");
                wordInput.focus();
            } else {
            }

            applyRulesVisibility();

            $(".rules .stats .usedWords td").textContent = milestone.usedWordCount;

            const currentPlayerIndex = players.indexOf(playersByPeerId[milestone.currentPlayerPeerId]);
            arrowAngle = (currentPlayerIndex * Math.PI * 2) / players.length;
        };
    };

    function load() {
        if (window.location.pathname == "/") {
            return;
        } else if (document.readyState == "complete" && socket && constants && players && hasLoadedText && ~selfPeerId && milestone && document.querySelector(".main.page")) {
            try {
                start();
            } catch (e) {
                console.error(e);
                setTimeout(load, 600);
            }
        } else {
            setTimeout(load, 600);
        }
    }
    load();
})();
