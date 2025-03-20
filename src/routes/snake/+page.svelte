<svelte:head>
    <title>Snake</title>
</svelte:head>
<div class="row">
    <div class="column">
        <section>
            <center>
                <div>
                    <p class="intro">This is my attempt of snake game to remeber how to use JS.</p>
                </div>
                <div id="score-board">
                    <span class="score-title">Max Score: <span class="score-value" id="max-score">0</span></span>
                    <span class="score-title">Score: <span class="score-value" id="current-score">0</span></span>
                </div>
                <div id="menu">
                    <button id="start-button">Start</button>
                </div>
            </center>
        </section>
    </div>
    <div class="column">
        <main>
            <center>
                <div id="canva">
                    <canvas id="game-canvas" width="600" height="600"></canvas>
                </div>
            </center>
        </main>
    </div>
</div>
<script src="assets/snake.js"></script>