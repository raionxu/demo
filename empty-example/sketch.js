let currentStage = 'P1';
let videos = {};
let defaultImage;

function preload() {
  // Load the default image
  defaultImage = loadImage('1.png');

  // Load all videos initially and set them up
  videos.P1 = createVideo('P1.mp4');
  videos.P2 = createVideo('P2.mp4');
  videos.P3 = createVideo('P3.mp4');
  videos.P4 = createVideo('P4.mp4');
  videos.P5 = createVideo('P5.mp4');

  for (let key in videos) {
    videos[key].size(360, 800);
    videos[key].position(0, 0);
    videos[key].style('opacity', '0'); // Set opacity to 0 to hide without reloading
    //videos[key].attribute('preload', 'auto'); // Ensure videos are preloaded
 
  
  }
}

function setup() {
  createCanvas(360, 800);
  image(defaultImage, 0, 0, 360, 800); // Display the default image initially
}

function touchStarted() {
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
    // Return to displaying the default image after looping
    resetToDefaultImage();
  });
}

function playVideo(stage, onComplete, loop = false) {
  // Hide the default image
  clear();
  
  // Pause all videos and set opacity to 0 to "hide" them without reloading
  for (let key in videos) {
    videos[key].pause();
    videos[key].style('opacity', '0');
  }

  let video = videos[stage];
  video.style('opacity', '1'); // Set opacity to 1 to make it visible
  video.play();

  if (loop) {
    video.loop();
  } else {
    video.onended(() => {
      if (onComplete) onComplete();
    });
  }
}

function resetToDefaultImage() {
  // Clear the canvas and redraw the default image
  clear();
  image(defaultImage, 0, 0, 360, 800);
}
