// ==UserScript==
// @name         dFuZer's Bombparty letters
// @namespace    http://tampermonkey.net/
// @version      1.0
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
        let rectSize = Math.round((canvasHeight / 7) * window.screenprop); // Frame's size in pixels
        let letterDone = "#363636"; // Placed letter's character color
        let letterTodo = "#141414"; // Not placed letter's character color
        let lettersOffset = (rectSize + 8) * 2 + 100; // Offset from the border in pixels, to bring the letters closer to eyesight
        let lettersYOffset = (canvasHeight - (window.gameBl.length / 3) * (rectSize + 8)) / 2 - 5;
        let lettersStyle = `bold ${Math.max(10, rectSize - 20)}px "Lato"`; // Letters style
        let rectDone = "#5c5c5c"; // Placed letter's frame
        let rectTodo = `rgb(255, ${255 - v}, ${255 - v})`; // Not placed letter's frame

        let wMap = {
            fr: {
                a: 1.5256986899065066,
                b: 9.946901733244067,
                s: 1.4549108444641745,
                c: 4.166626158381164,
                o: 2.3551618823512834,
                t: 2.1270373021554123,
                e: 1,
                u: 3.9456411406449177,
                p: 6.0254778792166475,
                r: 1.7476317688020828,
                i: 1.5366958032716047,
                l: 3.5685440396255217,
                v: 16.275097370983445,
                n: 1.9863305911328586,
                d: 6.326047669060528,
                h: 10.862934017905015,
                m: 5.608477547836153,
                g: 8.93956330476407,
                j: 87.04348392136441,
                q: 24.94146832798627,
                f: 11.769341806467512,
            },
            en: {
                a: 1.4429893051041345,
                m: 3.8302366493155966,
                k: 12.040871212121212,
                i: 1.2326768187934558,
                h: 4.2235198767006805,
                s: 1.1683506386106772,
                v: 12.38184084446695,
                f: 9.52474980523761,
                r: 1.6311608741834678,
                d: 3.4246452850109352,
                w: 14.365464569775849,
                t: 1.7011157787707702,
                l: 2.168224107824948,
                e: 1,
                g: 4.117763643664909,
                o: 1.634448574969021,
                y: 6.881838453378363,
                n: 1.6738049854144508,
                b: 5.90776293047373,
                c: 2.787874269877743,
                u: 3.4565215027456095,
                p: 3.639808093067992,
                j: 64.36100425187284,
                q: 65.60970072239422,
            },
            de: {
                a: 2.73757177282599,
                c: 5.923624107376872,
                h: 4.12401641600881,
                e: 1,
                n: 2.016918131960177,
                r: 2.079694176865345,
                i: 2.7291103950716145,
                s: 2.0736050168849856,
                d: 6.323609249905508,
                k: 8.255961650612988,
                b: 7.114702130127189,
                l: 3.8605557153816648,
                m: 6.18228411828504,
                t: 2.274399997175211,
                g: 4.991406231838012,
                u: 4.076411434502225,
                f: 8.383073148829007,
                o: 5.917284460980203,
                w: 18.048053349024222,
                p: 10.522441578384207,
                v: 20.30278005421421,
                z: 13.363748586603595,
            },
            es: {
                a: 1,
                r: 1.8447025936569328,
                o: 2.41802476402987,
                n: 2.6554940842190717,
                i: 2.0933130548999084,
                c: 3.74036245566359,
                s: 1.726811027470916,
                t: 4.065102987994323,
                b: 7.290752868660741,
                l: 4.554789604651862,
                m: 4.812278925310243,
                d: 4.580222050313541,
                e: 1.4156075564038826,
                h: 17.123032927262738,
                j: 27.907441542026543,
                g: 11.734368944938383,
                u: 6.164391449760069,
                q: 44.64814424737751,
                v: 21.15521887538176,
                p: 7.941113000996561,
                f: 18.4790940159018,
            },
            "pt-BR": {
                a: 1,
                b: 11.624850076177509,
                c: 3.5751029319403043,
                t: 3.466352845654191,
                e: 1.2466670606516743,
                i: 1.6404702545687426,
                r: 1.5522644539382842,
                o: 2.0076192288959676,
                s: 1.407194205082325,
                l: 5.501748949096377,
                d: 4.423904864118032,
                f: 11.972190692395007,
                m: 2.755672867823909,
                n: 3.3874106189841973,
                v: 8.14201384947213,
                u: 5.460532326339191,
                h: 19.10270068715709,
                q: 43.669629810034095,
                j: 42.39950342870655,
                g: 10.515335444522636,
                p: 6.806905322298991,
            },
            it: {
                a: 1.0079914730932056,
                b: 8.08099650980864,
                c: 2.393618917473709,
                h: 21.415585796300235,
                i: 1,
                o: 1.2727060206099587,
                u: 5.6672012153950035,
                d: 4.707195102002664,
                e: 1.334024291712473,
                s: 2.2337488079132384,
                n: 1.7814440101172684,
                r: 1.5795974059581408,
                t: 1.5677827589427478,
                z: 8.596210472410704,
                m: 4.155355227328988,
                g: 5.320241931223919,
                l: 2.875629916201516,
                v: 7.704237741910808,
                f: 8.691909385113268,
                p: 4.715680307144864,
                q: 88.23258869908015,
            },
        };

        let wc = valueMap(rules.dictionaryId.value);

        window.screenprop = 0.6;

        function defaultvMap() {
            let o = {};
            let l = milestone.dictionaryManifest.bonusAlphabet.split("");
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
            window.gameBl = milestone.dictionaryManifest.bonusAlphabet.split("");
            if (wMap[d]) {
                v = vMap(wMap[d]);
                window.gameBl.sort((a, b) => v[b] - v[a]);
            } else {
                v = defaultvMap();
            }
            return v;
        }

        socket.on("setRules", function (d) {
            if (d.dictionaryId) {
                wc = valueMap(rules.dictionaryId.value);
            }
        });

        window.animate = (animateTime) => {
            requestAnimationFrame(animate);

            const elapsedAnimateTime = previousAnimateTime > 0 ? animateTime - previousAnimateTime : 0;
            previousAnimateTime = animateTime;

            const canvasRect = canvas.getBoundingClientRect();
            const canvasWidth = canvasRect.width;
            const canvasHeight = canvasRect.height;

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
                //Funny tweak that you can reactivate if you want to see the 1st player's letters (which means the bot of a room bot's letters), instead of seeing nothing when you're not playing.
                const selfPlayerState = milestone.playerStatesByPeerId[selfPeerId] !== undefined ? milestone.playerStatesByPeerId[selfPeerId] : milestone.playerStatesByPeerId[0];

                //const selfPlayerState = milestone.playerStatesByPeerId[selfPeerId];
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

                        ctx.save();

                        //ctx.translate(l % 2 == 1 ? -lettersOffset : (0 - letterSize - letterSpacing) - lettersOffset, Math.floor(l / 2) * (letterSize + letterSpacing));
                        ctx.translate(-(l % 3) * (0 - letterSize - letterSpacing) - lettersOffset, Math.floor(l / 3) * (letterSize + letterSpacing) + lettersYOffset);
                        ctx.fillStyle = selfPlayerState.bonusLetters.includes(letter) ? rectDone : rectTodo;
                        ctx.fillRect(-letterSize / 2, -letterSize / 2, letterSize, letterSize);

                        ctx.font = lettersStyle;
                        ctx.fillStyle = selfPlayerState.bonusLetters.includes(letter) ? letterDone : letterTodo;
                        ctx.fillText(letter.toUpperCase(), 0, 0);
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
            console.log("mdr");
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
