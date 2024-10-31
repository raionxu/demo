let currentStage = 'P1';
let videos = {};

function preload() {
  // Load videos here
  videos.P1 = createVideo('P1.mp4');
  videos.P2 = createVideo('P2.mp4');
  videos.P3 = createVideo('P3.mp4');
  videos.P4 = createVideo('P4.mp4');
  videos.P5 = createVideo('P5.mp4');

  // Hide and style video elements initially
  for (let key in videos) {
    //videos[key].style('position', 'absolute'); // Absolute positioning
    videos[key].position(0, 0); // Set video to the top-left corner
    videos[key].size(1080, 2400); // Set video size to match canvas
    videos[key].style('visibility', 'hidden'); // Start with hidden visibility
  }
}

function setup() {
  createCanvas(1080, 2400);
  //noLoop(); // We don't need draw() to loop
}


function mousePressed() {
  if (currentStage === 'P1') {
    playP1();
  } else if (currentStage === 'P2') {
    playP3();
  } else if (currentStage === 'P4') {
    playP5();
  }
}

function playP1() {
  currentStage = 'P1';
  playVideo(currentStage, () => {
    currentStage = 'P2';
    playP2();
  }, false);
}

function playP2() {
  currentStage = 'P2';
  playVideo(currentStage, null, true);
}

function playP3() {
  currentStage = 'P3';
  playVideo(currentStage, () => {
    currentStage = 'P4';
    playP4();
  });
}

function playP4() {
  currentStage = 'P4';
  playVideo(currentStage, null, true);
}

function playP5() {
  currentStage = 'P5';
  playVideo(currentStage, () => {
    currentStage = 'P1';
  });
}

function playVideo(stage, onComplete, loop = false) {
  // Stop and hide all videos first, using visibility to prevent reloading
  for (let key in videos) {
    videos[key].stop();
    videos[key].style('visibility', 'hidden');
  }

  let video = videos[stage];
  video.style('visibility', 'visible'); // Make the target video visible
  video.play();
  if (loop) {
    video.loop();
  } else {
    video.onended(() => {
      if (onComplete) onComplete();
    });
  }
}
