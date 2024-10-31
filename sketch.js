let currentStage = 'P1';
let videos = {};
let defaultImage;

function preload() {
  defaultImage = loadImage('1.png');
}

function setup() {
  createCanvas(360, 800);
  image(defaultImage, 0, 0, 360, 800); // Display the default image initially

  // 获取已加载的视频元素
  videos.P1 = select("#P1").elt;
  videos.P2 = select("#P2").elt; 
  videos.P3 = select("#P3").elt;
  videos.P4 = select("#P4").elt;
  videos.P5 = select("#P5").elt;

  for (let key in videos) {
    videos[key].pause();
    videos[key].style.opacity = "0";
  }
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
    resetToDefaultImage();
  });
}

function playVideo(stage, onComplete, loop = false) {
  clear();
  
  for (let key in videos) {
    videos[key].pause();
    videos[key].style.opacity = "0";
  }

  let video = videos[stage];
  video.style.opacity = "1";
  video.play();

  if (loop) {
    video.loop = true;
  } else {
    video.onended = () => {
      if (onComplete) onComplete();
    };
  }
}

function resetToDefaultImage() {
  clear();
  image(defaultImage, 0, 0, 360, 800);
}
