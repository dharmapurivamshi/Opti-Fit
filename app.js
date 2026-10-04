
import * as THREE from "three";

import {
    OrbitControls
} from "three/addons/controls/OrbitControls.js";

import {
    GLTFLoader
} from "three/addons/loaders/GLTFLoader.js";


// ============================================================
// OPTIFIT - 3D VIRTUAL EYEWEAR
// 3D VIEWER + LIVE CAMERA + UPLOAD PHOTO FITTING
// + FRAME INFORMATION PANEL
// ============================================================


// ============================================================
// 1. VIEWER
// ============================================================

const viewer = document.getElementById("viewer");

if (!viewer) {
    throw new Error("OPTIFIT: viewer not found.");
}


// ============================================================
// 2. SCENE
// ============================================================

const scene = new THREE.Scene();

scene.background =
    new THREE.Color(0xf2f2f2);


// ============================================================
// 3. THREE CAMERA
// ============================================================

const camera =
    new THREE.PerspectiveCamera(
        45,
        viewer.clientWidth /
        viewer.clientHeight,
        0.01,
        1000
    );

camera.position.set(
    0,
    0,
    5
);


// ============================================================
// 4. RENDERER
// ============================================================

const renderer =
    new THREE.WebGLRenderer({

        antialias: true,
        alpha: true,
        powerPreference: "high-performance"

    });

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.setSize(
    viewer.clientWidth,
    viewer.clientHeight
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
    1.2;


renderer.domElement.style.position =
    "absolute";

renderer.domElement.style.top =
    "0";

renderer.domElement.style.left =
    "0";

renderer.domElement.style.width =
    "100%";

renderer.domElement.style.height =
    "100%";

renderer.domElement.style.zIndex =
    "2";

renderer.domElement.style.pointerEvents =
    "auto";

viewer.appendChild(
    renderer.domElement
);


// ============================================================
// 5. LIGHTING
// ============================================================

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        2
    )
);


const keyLight =
    new THREE.DirectionalLight(
        0xffffff,
        4
    );

keyLight.position.set(
    3,
    5,
    5
);

scene.add(
    keyLight
);


const frontLight =
    new THREE.DirectionalLight(
        0xffffff,
        3
    );

frontLight.position.set(
    0,
    2,
    8
);

scene.add(
    frontLight
);


const leftLight =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

leftLight.position.set(
    -5,
    3,
    4
);

scene.add(
    leftLight
);


const rightLight =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

rightLight.position.set(
    5,
    3,
    4
);

scene.add(
    rightLight
);


// ============================================================
// 6. ORBIT CONTROLS
// ============================================================

const controls =
    new OrbitControls(
        camera,
        renderer.domElement
    );

controls.enableDamping =
    true;

controls.dampingFactor =
    0.05;

controls.enableRotate =
    true;

controls.enableZoom =
    true;

controls.minDistance =
    1;

controls.maxDistance =
    20;


// ============================================================
// 7. GLTF
// ============================================================

const loader =
    new GLTFLoader();

let glasses = null;

let selectedFrame =
    "Wayfarer";


// ============================================================
// 8. 10 MODELS
// ============================================================

const frameModels = {

    Aviator:
        "models/aviator.glb",

    Wayfarer:
        "models/wayfarer.glb",

    "Cat-Eye":
        "models/cateye.glb",

    Clubmaster:
        "models/clubmaster.glb",

    Square:
        "models/glassesmeshysquare.glb",

    Hexagonal:
        "models/hexgraphite.glb",

    Oval:
        "models/glassesmeshyellipse.glb",

    Rectangle:
        "models/rectanglefrost.glb",

    Round:
        "models/roundtortoise.glb",

    Sport:
        "models/sport.glb"

};


// ============================================================
// 9. FRAME CALIBRATION
// ============================================================

const frameCalibration = {

    Aviator: {
        x: 0,
        y: -0.12,
        z: -0.12,
        scale: 1.00
    },

    Wayfarer: {
        x: 0,
        y: -0.12,
        z: -0.12,
        scale: 1.00
    },

    "Cat-Eye": {
        x: 0,
        y: -0.12,
        z: -0.12,
        scale: 0.98
    },

    Clubmaster: {
        x: 0,
        y: -0.12,
        z: -0.12,
        scale: 1.00
    },

    Square: {
        x: 0,
        y: -0.12,
        z: -0.12,
        scale: 1.00
    },

    Hexagonal: {
        x: 0,
        y: -0.12,
        z: -0.12,
        scale: 0.98
    },

    Oval: {
        x: 0,
        y: -0.12,
        z: -0.12,
        scale: 0.98
    },

    Rectangle: {
        x: 0,
        y: -0.12,
        z: -0.12,
        scale: 1.00
    },

    Round: {
        x: 0,
        y: -0.12,
        z: -0.12,
        scale: 0.98
    },

    Sport: {
        x: 0,
        y: -0.12,
        z: -0.12,
        scale: 1.00
    }

};


// ============================================================
// 10. FRAME INFORMATION
// ============================================================

const frameInfo = {

    Aviator: {
        style: "Classic",
        shape: "Aviator",
        material: "Metal",
        color: "Black",
        fit: "Medium",
        price: "$99"
    },

    Wayfarer: {
        style: "Bold",
        shape: "Wayfarer",
        material: "Acetate",
        color: "Black",
        fit: "Medium",
        price: "$89"
    },

    "Cat-Eye": {
        style: "Fashion",
        shape: "Cat-Eye",
        material: "Acetate",
        color: "Black",
        fit: "Small / Medium",
        price: "$95"
    },

    Clubmaster: {
        style: "Premium",
        shape: "Clubmaster",
        material: "Acetate + Metal",
        color: "Black / Gold",
        fit: "Medium",
        price: "$109"
    },

    Square: {
        style: "Modern",
        shape: "Square",
        material: "Acetate",
        color: "Black",
        fit: "Medium / Large",
        price: "$99"
    },

    Hexagonal: {
        style: "Geometric",
        shape: "Hexagonal",
        material: "Metal",
        color: "Graphite",
        fit: "Medium",
        price: "$105"
    },

    Oval: {
        style: "Elegant",
        shape: "Oval",
        material: "Acetate",
        color: "Black",
        fit: "Small / Medium",
        price: "$92"
    },

    Rectangle: {
        style: "Frost",
        shape: "Rectangle",
        material: "Acetate",
        color: "Clear",
        fit: "Medium",
        price: "$97"
    },

    Round: {
        style: "Vintage",
        shape: "Round",
        material: "Acetate",
        color: "Tortoise",
        fit: "Medium",
        price: "$94"
    },

    Sport: {
        style: "Active",
        shape: "Sport",
        material: "TR90",
        color: "Black",
        fit: "Medium / Large",
        price: "$115"
    }

};


// ============================================================
// 11. CREATE FRAME INFORMATION PANEL
// ============================================================

const infoPanel =
    document.createElement("div");

infoPanel.id =
    "frameInfoPanel";

infoPanel.style.position =
    "absolute";

infoPanel.style.top =
    "20px";

infoPanel.style.right =
    "20px";

infoPanel.style.width =
    "250px";

infoPanel.style.padding =
    "20px";

infoPanel.style.background =
    "rgba(255,255,255,0.96)";

infoPanel.style.borderRadius =
    "16px";

infoPanel.style.boxShadow =
    "0 10px 30px rgba(0,0,0,0.15)";

infoPanel.style.zIndex =
    "25";

infoPanel.style.fontFamily =
    "Arial, sans-serif";

infoPanel.style.color =
    "#111";

infoPanel.style.backdropFilter =
    "blur(10px)";

infoPanel.style.boxSizing =
    "border-box";


viewer.appendChild(
    infoPanel
);


// ============================================================
// 12. UPDATE INFORMATION PANEL
// ============================================================

function updateFrameInfo(frameName) {

    const info =
        frameInfo[frameName];

    if (!info) {
        return;
    }


    infoPanel.innerHTML = `

        <div style="
            font-size:11px;
            letter-spacing:2px;
            color:#777;
            margin-bottom:8px;
        ">
            SELECTED FRAME
        </div>

        <h2 style="
            margin:0 0 16px 0;
            font-size:25px;
            font-weight:600;
        ">
            ${frameName}
        </h2>

        <div style="
            display:flex;
            flex-direction:column;
            gap:10px;
            font-size:14px;
        ">

            <div style="
                display:flex;
                justify-content:space-between;
                border-bottom:1px solid #eee;
                padding-bottom:8px;
            ">
                <span>Style</span>
                <strong>${info.style}</strong>
            </div>

            <div style="
                display:flex;
                justify-content:space-between;
                border-bottom:1px solid #eee;
                padding-bottom:8px;
            ">
                <span>Shape</span>
                <strong>${info.shape}</strong>
            </div>

            <div style="
                display:flex;
                justify-content:space-between;
                border-bottom:1px solid #eee;
                padding-bottom:8px;
            ">
                <span>Material</span>
                <strong>${info.material}</strong>
            </div>

            <div style="
                display:flex;
                justify-content:space-between;
                border-bottom:1px solid #eee;
                padding-bottom:8px;
            ">
                <span>Color</span>
                <strong>${info.color}</strong>
            </div>

            <div style="
                display:flex;
                justify-content:space-between;
                border-bottom:1px solid #eee;
                padding-bottom:8px;
            ">
                <span>Fit</span>
                <strong>${info.fit}</strong>
            </div>

        </div>

        <div style="
            margin-top:18px;
            display:flex;
            align-items:center;
            justify-content:space-between;
        ">

            <span style="
                font-size:13px;
                color:#777;
            ">
                Price
            </span>

            <strong style="
                font-size:22px;
            ">
                ${info.price}
            </strong>

        </div>

    `;
}


// ============================================================
// 13. DEFAULT INFORMATION
// ============================================================

updateFrameInfo(
    "Wayfarer"
);


// ============================================================
// 14. LOADING MESSAGE
// ============================================================

const loadingMessage =
    document.createElement("div");

loadingMessage.innerText =
    "LOADING 3D GLASSES...";

loadingMessage.style.position =
    "absolute";

loadingMessage.style.top =
    "50%";

loadingMessage.style.left =
    "50%";

loadingMessage.style.transform =
    "translate(-50%, -50%)";

loadingMessage.style.zIndex =
    "20";

loadingMessage.style.color =
    "#555";

loadingMessage.style.background =
    "rgba(255,255,255,0.9)";

loadingMessage.style.padding =
    "10px 16px";

loadingMessage.style.fontSize =
    "13px";

loadingMessage.style.letterSpacing =
    "2px";

loadingMessage.style.pointerEvents =
    "none";

viewer.appendChild(
    loadingMessage
);


// ============================================================
// 15. STATUS
// ============================================================

const cameraStatus =
    document.getElementById(
        "cameraStatus"
    );


function setStatus(
    text,
    active = false
) {

    if (!cameraStatus) {
        return;
    }

    cameraStatus.innerText =
        text;

    cameraStatus.style.display =
        "block";

    cameraStatus.style.position =
        "absolute";

    cameraStatus.style.top =
        "20px";

    cameraStatus.style.left =
        "50%";

    cameraStatus.style.transform =
        "translateX(-50%)";

    cameraStatus.style.zIndex =
        "30";

    cameraStatus.style.padding =
        "8px 16px";

    cameraStatus.style.borderRadius =
        "20px";

    cameraStatus.style.color =
        "#fff";

    cameraStatus.style.fontSize =
        "12px";

    cameraStatus.style.background =
        active
            ? "rgba(0,140,70,0.85)"
            : "rgba(0,0,0,0.65)";

}


// ============================================================
// 16. REMOVE CURRENT MODEL
// ============================================================

function removeCurrentModel() {

    if (!glasses) {
        return;
    }

    scene.remove(
        glasses
    );

    glasses.traverse(
        object => {

            if (object.geometry) {
                object.geometry.dispose();
            }

            if (object.material) {

                if (
                    Array.isArray(
                        object.material
                    )
                ) {

                    object.material.forEach(
                        material => {

                            material.dispose();

                        }
                    );

                } else {

                    object.material.dispose();

                }

            }

        }
    );

    glasses = null;

}


// ============================================================
// 17. LOAD FRAME
// ============================================================

function loadFrame(
    frameName
) {

    const modelPath =
        frameModels[frameName];


    if (!modelPath) {

        console.error(
            "No model:",
            frameName
        );

        return;

    }


    selectedFrame =
        frameName;


    // UPDATE PANEL IMMEDIATELY

    updateFrameInfo(
        frameName
    );


    removeCurrentModel();


    loadingMessage.style.display =
        "block";

    loadingMessage.innerText =
        "LOADING " +
        frameName.toUpperCase() +
        "...";


    loader.load(

        modelPath,

        gltf => {

            glasses =
                gltf.scene;


            glasses.visible =
                true;


            // ----------------------------------------
            // CENTER MODEL
            // ----------------------------------------

            const box =
                new THREE.Box3()
                    .setFromObject(
                        glasses
                    );


            const center =
                box.getCenter(
                    new THREE.Vector3()
                );


            glasses.position.sub(
                center
            );


            // ----------------------------------------
            // NORMALIZE MODEL
            // ----------------------------------------

            const size =
                box.getSize(
                    new THREE.Vector3()
                );


            const maxDimension =
                Math.max(
                    size.x,
                    size.y,
                    size.z
                );


            if (
                maxDimension > 0
            ) {

                const scale =
                    3 /
                    maxDimension;

                glasses.scale.setScalar(
                    scale
                );

            }


            glasses.position.set(
                0,
                0,
                0
            );


            glasses.rotation.set(
                0,
                0,
                0
            );


            scene.add(
                glasses
            );


            // ----------------------------------------
            // RESET TRACKING
            // ----------------------------------------

            smoothX = 0;
            smoothY = 0;
            smoothZ = -0.12;
            smoothScale = 1;
            smoothYaw = 0;
            smoothPitch = 0;
            smoothRoll = 0;


            loadingMessage.style.display =
                "none";


            console.log(
                frameName +
                " loaded"
            );


            // If photo is currently active,
            // refit the newly selected frame.

            if (
                photoMode &&
                photoFaceResult
            ) {

                fitPhotoGlasses(
                    photoFaceResult
                );

            }

        },

        progress => {

            if (
                progress.total > 0
            ) {

                const percent =
                    Math.round(
                        progress.loaded /
                        progress.total *
                        100
                    );

                loadingMessage.innerText =
                    "LOADING " +
                    percent +
                    "%";

            }

        },

        error => {

            console.error(
                "MODEL ERROR:",
                modelPath,
                error
            );


            loadingMessage.innerText =
                "3D FRAME COULD NOT LOAD";

            loadingMessage.style.color =
                "#aa0000";

        }

    );

}


// ============================================================
// 18. DEFAULT FRAME
// ============================================================

loadFrame(
    "Wayfarer"
);


// ============================================================
// 19. SELECT FRAME
// ============================================================

function selectFrame(
    frameName
) {

    selectedFrame =
        frameName;

    updateFrameInfo(
        frameName
    );

    loadFrame(
        frameName
    );

}


// ============================================================
// 20. CAMERA
// ============================================================

let cameraStream =
    null;

let cameraVideo =
    null;


// ============================================================
// 21. TRACKING
// ============================================================

let faceApiReady =
    false;

let trackingRunning =
    false;

let trackingAnimation =
    null;


// ============================================================
// 22. SMOOTH VALUES
// ============================================================

let smoothX = 0;
let smoothY = 0;
let smoothZ = -0.12;

let smoothScale = 1;

let smoothYaw = 0;
let smoothPitch = 0;
let smoothRoll = 0;


// ============================================================
// 23. SMOOTHING
// ============================================================

const POSITION_SMOOTHING =
    0.35;

const SCALE_SMOOTHING =
    0.25;

const ROTATION_SMOOTHING =
    0.30;


// ============================================================
// 24. PHOTO VARIABLES
// ============================================================

let photoMode =
    false;

let photoFaceResult =
    null;

let photoImage =
    null;

let photoObjectURL =
    null;


// ============================================================
// 25. LOAD FACE-API
// ============================================================

function loadFaceApiScript() {

    return new Promise(
        (resolve, reject) => {

            if (
                window.faceapi
            ) {

                resolve();

                return;

            }


            const script =
                document.createElement(
                    "script"
                );


            script.src =
                "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js";


            script.onload =
                () => {

                    console.log(
                        "FACE API LOADED"
                    );

                    resolve();

                };


            script.onerror =
                () => {

                    reject(
                        new Error(
                            "FACE API LOAD FAILED"
                        )
                    );

                };


            document.head.appendChild(
                script
            );

        }
    );

}


// ============================================================
// 26. PREPARE FACE TRACKING
// ============================================================

async function prepareFaceTracking() {

    if (
        faceApiReady
    ) {

        return true;

    }


    try {

        setStatus(
            "LOADING FACE TRACKER..."
        );


        await loadFaceApiScript();


        const MODEL_URL =
            "https://justadudewhohacks.github.io/face-api.js/models";


        await faceapi.nets.tinyFaceDetector.loadFromUri(
            MODEL_URL
        );


        await faceapi.nets.faceLandmark68TinyNet.loadFromUri(
            MODEL_URL
        );


        faceApiReady =
            true;


        console.log(
            "FACE TRACKER READY"
        );


        return true;

    }

    catch (error) {

        console.error(
            "TRACKER ERROR:",
            error
        );


        setStatus(
            "FACE TRACKER FAILED"
        );


        return false;

    }

}


// ============================================================
// 27. START CAMERA
// ============================================================

async function startCamera() {

    console.log(
        "USE CAMERA CLICKED"
    );


    exitPhotoMode();


    try {

        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            alert(
                "Camera is not supported."
            );

            return;

        }


        if (
            cameraStream
        ) {

            cameraStream
                .getTracks()
                .forEach(
                    track => {

                        track.stop();

                    }
                );

        }


        cameraStream =
            await navigator.mediaDevices.getUserMedia({

                video: {

                    facingMode:
                        "user",

                    width: {
                        ideal: 1280
                    },

                    height: {
                        ideal: 720
                    }

                },

                audio: false

            });


        cameraVideo =
            document.getElementById(
                "cameraVideo"
            );


        if (!cameraVideo) {

            cameraVideo =
                document.createElement(
                    "video"
                );

            cameraVideo.id =
                "cameraVideo";

            viewer.insertBefore(
                cameraVideo,
                renderer.domElement
            );

        }


        cameraVideo.srcObject =
            cameraStream;

        cameraVideo.autoplay =
            true;

        cameraVideo.playsInline =
            true;

        cameraVideo.muted =
            true;


        cameraVideo.style.position =
            "absolute";

        cameraVideo.style.top =
            "0";

        cameraVideo.style.left =
            "0";

        cameraVideo.style.width =
            "100%";

        cameraVideo.style.height =
            "100%";

        cameraVideo.style.objectFit =
            "cover";

        cameraVideo.style.display =
            "block";

        cameraVideo.style.visibility =
            "visible";

        cameraVideo.style.opacity =
            "1";

        cameraVideo.style.zIndex =
            "1";

        cameraVideo.style.transform =
            "scaleX(-1)";


        scene.background =
            null;

        renderer.domElement.style.zIndex =
            "2";


        await cameraVideo.play();


        setStatus(
            "CAMERA ON"
        );


        const ready =
            await prepareFaceTracking();


        if (!ready) {

            return;

        }


        startTracking();

    }

    catch (error) {

        console.error(
            "CAMERA ERROR:",
            error
        );


        alert(
            "Camera could not start.\n\n" +
            "Please allow camera permission."
        );

    }

}


// ============================================================
// 28. START TRACKING
// ============================================================

function startTracking() {

    if (
        trackingRunning
    ) {

        return;

    }


    trackingRunning =
        true;


    trackingAnimation =
        requestAnimationFrame(
            trackingFrame
        );

}


// ============================================================
// 29. TRACKING LOOP
// ============================================================

async function trackingFrame() {

    if (
        !trackingRunning
    ) {

        return;

    }


    if (
        !cameraVideo ||
        cameraVideo.readyState < 2
    ) {

        trackingAnimation =
            requestAnimationFrame(
                trackingFrame
            );

        return;

    }


    try {

        const result =
            await faceapi
                .detectSingleFace(

                    cameraVideo,

                    new faceapi.TinyFaceDetectorOptions({

                        inputSize:
                            320,

                        scoreThreshold:
                            0.45

                    })

                )
                .withFaceLandmarks(
                    true
                );


        if (
            result &&
            glasses
        ) {

            updateGlasses(
                result
            );

        } else {

            setStatus(
                "LOOK AT CAMERA"
            );

        }

    }

    catch (error) {

        console.error(
            "TRACKING ERROR:",
            error
        );

    }


    trackingAnimation =
        requestAnimationFrame(
            trackingFrame
        );

}


// ============================================================
// 30. UPDATE GLASSES - LIVE CAMERA
// ============================================================

function updateGlasses(
    result
) {

    if (!glasses) {
        return;
    }


    const points =
        result.landmarks.positions;


    if (
        !points ||
        points.length < 68
    ) {

        return;

    }


    const leftEye =
        averagePoints(
            points,
            36,
            41
        );


    const rightEye =
        averagePoints(
            points,
            42,
            47
        );


    const leftCorner =
        points[36];

    const rightCorner =
        points[45];

    const nose =
        points[30];

    const leftFace =
        points[0];

    const rightFace =
        points[16];

    const chin =
        points[8];

    const forehead =
        points[27];


    const eyeCenterX =
        (
            leftEye.x +
            rightEye.x
        ) / 2;


    const eyeCenterY =
        (
            leftEye.y +
            rightEye.y
        ) / 2;


    const eyeDistance =
        distance(
            leftEye,
            rightEye
        );


    if (
        eyeDistance < 15
    ) {

        return;

    }


    const videoWidth =
        cameraVideo.videoWidth;

    const videoHeight =
        cameraVideo.videoHeight;


    if (
        !videoWidth ||
        !videoHeight
    ) {

        return;

    }


    let nx =
        eyeCenterX /
        videoWidth;

    let ny =
        eyeCenterY /
        videoHeight;


    nx =
        1 - nx;


    const targetX =
        (
            nx -
            0.5
        ) * 4.7;


    const targetY =
        -(
            ny -
            0.5
        ) * 3.0;


    const calibration =
        frameCalibration[
            selectedFrame
        ] ||
        frameCalibration.Wayfarer;


    const calibratedX =
        targetX +
        calibration.x;


    const calibratedY =
        targetY +
        calibration.y;


    smoothX =
        THREE.MathUtils.lerp(
            smoothX,
            calibratedX,
            POSITION_SMOOTHING
        );


    smoothY =
        THREE.MathUtils.lerp(
            smoothY,
            calibratedY,
            POSITION_SMOOTHING
        );


    glasses.position.x =
        smoothX;

    glasses.position.y =
        smoothY;


    let targetScale =
        eyeDistance /
        112;


    targetScale *=
        calibration.scale;


    targetScale =
        THREE.MathUtils.clamp(
            targetScale,
            0.45,
            1.70
        );


    smoothScale =
        THREE.MathUtils.lerp(
            smoothScale,
            targetScale,
            SCALE_SMOOTHING
        );


    glasses.scale.setScalar(
        smoothScale
    );


    // ROLL

    const eyeDX =
        rightCorner.x -
        leftCorner.x;

    const eyeDY =
        rightCorner.y -
        leftCorner.y;


    const targetRoll =
        Math.atan2(
            eyeDY,
            eyeDX
        );


    smoothRoll =
        lerpAngle(
            smoothRoll,
            targetRoll,
            ROTATION_SMOOTHING
        );


    glasses.rotation.z =
        -smoothRoll;


    // YAW

    const noseToLeft =
        Math.abs(
            nose.x -
            leftFace.x
        );

    const noseToRight =
        Math.abs(
            rightFace.x -
            nose.x
        );

    const faceWidth =
        Math.abs(
            rightFace.x -
            leftFace.x
        );


    if (
        faceWidth > 20
    ) {

        const yawRatio =
            (
                noseToRight -
                noseToLeft
            ) /
            faceWidth;


        let targetYaw =
            yawRatio *
            3.0;


        targetYaw =
            THREE.MathUtils.clamp(
                targetYaw,
                -0.90,
                0.90
            );


        smoothYaw =
            THREE.MathUtils.lerp(
                smoothYaw,
                targetYaw,
                0.20
            );


        glasses.rotation.y =
            smoothYaw;

    }


    // PITCH

    const faceHeight =
        Math.abs(
            chin.y -
            forehead.y
        );


    if (
        faceHeight > 20
    ) {

        const noseVertical =
            (
                nose.y -
                eyeCenterY
            ) /
            eyeDistance;


        let targetPitch =
            (
                noseVertical -
                0.42
            ) * 1.25;


        targetPitch =
            THREE.MathUtils.clamp(
                targetPitch,
                -0.65,
                0.65
            );


        smoothPitch =
            THREE.MathUtils.lerp(
                smoothPitch,
                targetPitch,
                0.15
            );


        glasses.rotation.x =
            smoothPitch;

    }


    smoothZ =
        THREE.MathUtils.lerp(
            smoothZ,
            -0.12,
            0.15
        );


    glasses.position.z =
        smoothZ;


    setStatus(
        "FACE TRACKING ACTIVE",
        true
    );

}


// ============================================================
// 31. PHOTO UPLOAD
// ============================================================

function selectPhoto() {

    const photoInput =
        document.getElementById(
            "photoInput"
        );


    if (
        photoInput
    ) {

        photoInput.click();

    }

}


// ============================================================
// 32. PHOTO INPUT
// ============================================================

const photoInput =
    document.getElementById(
        "photoInput"
    );


if (
    photoInput
) {

    photoInput.addEventListener(
        "change",
        async function () {

            if (
                !this.files ||
                this.files.length === 0
            ) {

                return;

            }


            const file =
                this.files[0];


            await uploadPhoto(
                file
            );

        }
    );

}


// ============================================================
// 33. UPLOAD PHOTO
// ============================================================

async function uploadPhoto(
    file
) {

    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        alert(
            "Please select an image file."
        );

        return;

    }


    try {

        stopCamera();


        photoMode =
            true;


        setStatus(
            "ANALYZING PHOTO..."
        );


        loadingMessage.style.display =
            "block";

        loadingMessage.innerText =
            "ANALYZING FACE...";


        const ready =
            await prepareFaceTracking();


        if (!ready) {

            return;

        }


        if (
            photoObjectURL
        ) {

            URL.revokeObjectURL(
                photoObjectURL
            );

        }


        photoObjectURL =
            URL.createObjectURL(
                file
            );


        const image =
            new Image();


        image.onload =
            async () => {

                photoImage =
                    image;


                showPhotoImage(
                    image
                );


                try {

                    const result =
                        await faceapi
                            .detectSingleFace(

                                image,

                                new faceapi.TinyFaceDetectorOptions({

                                    inputSize:
                                        416,

                                    scoreThreshold:
                                        0.35

                                })

                            )
                            .withFaceLandmarks(
                                true
                            );


                    if (
                        !result
                    ) {

                        photoFaceResult =
                            null;


                        loadingMessage.style.display =
                            "none";


                        setStatus(
                            "NO FACE FOUND"
                        );


                        alert(
                            "I couldn't detect a face in this photo.\n\n" +
                            "Please use a clear front-facing photo."
                        );


                        return;

                    }


                    photoFaceResult =
                        result;


                    fitPhotoGlasses(
                        result
                    );


                    loadingMessage.style.display =
                        "none";


                    setStatus(
                        "PHOTO FITTING COMPLETE",
                        true
                    );


                    console.log(
                        "PHOTO FACE DETECTED"
                    );

                }

                catch (error) {

                    console.error(
                        "PHOTO FACE ERROR:",
                        error
                    );


                    loadingMessage.style.display =
                        "none";


                    setStatus(
                        "PHOTO FITTING FAILED"
                    );

                }

            };


        image.onerror =
            () => {

                loadingMessage.style.display =
                    "none";


                setStatus(
                    "PHOTO LOAD FAILED"
                );


                alert(
                    "Could not load this image."
                );

            };


        image.src =
            photoObjectURL;

    }

    catch (error) {

        console.error(
            "PHOTO ERROR:",
            error
        );


        loadingMessage.style.display =
            "none";


        setStatus(
            "PHOTO ERROR"
        );

    }

}


// ============================================================
// 34. SHOW PHOTO
// ============================================================

function showPhotoImage(
    image
) {

    let photoElement =
        document.getElementById(
            "uploadedPhoto"
        );


    if (!photoElement) {

        photoElement =
            document.createElement(
                "img"
            );

        photoElement.id =
            "uploadedPhoto";


        viewer.insertBefore(
            photoElement,
            renderer.domElement
        );

    }


    photoElement.src =
        image.src;


    photoElement.style.position =
        "absolute";

    photoElement.style.top =
        "0";

    photoElement.style.left =
        "0";

    photoElement.style.width =
        "100%";

    photoElement.style.height =
        "100%";

    photoElement.style.objectFit =
        "contain";

    photoElement.style.objectPosition =
        "center center";

    photoElement.style.display =
        "block";

    photoElement.style.zIndex =
        "1";

    photoElement.style.background =
        "#f2f2f2";


    scene.background =
        null;


    renderer.domElement.style.zIndex =
        "2";

}


// ============================================================
// 35. PHOTO GLASSES FITTING
// ============================================================

function fitPhotoGlasses(
    result
) {

    if (
        !glasses ||
        !photoImage
    ) {

        return;

    }


    const points =
        result.landmarks.positions;


    if (
        !points ||
        points.length < 68
    ) {

        return;

    }


    const leftEye =
        averagePoints(
            points,
            36,
            41
        );


    const rightEye =
        averagePoints(
            points,
            42,
            47
        );


    const leftCorner =
        points[36];

    const rightCorner =
        points[45];


    const nose =
        points[30];


    const leftFace =
        points[0];

    const rightFace =
        points[16];


    const chin =
        points[8];

    const forehead =
        points[27];


    const eyeCenterX =
        (
            leftEye.x +
            rightEye.x
        ) / 2;


    const eyeCenterY =
        (
            leftEye.y +
            rightEye.y
        ) / 2;


    const eyeDistance =
        distance(
            leftEye,
            rightEye
        );


    if (
        eyeDistance < 15
    ) {

        return;

    }


    const viewerWidth =
        viewer.clientWidth;

    const viewerHeight =
        viewer.clientHeight;


    const imageWidth =
        photoImage.naturalWidth;

    const imageHeight =
        photoImage.naturalHeight;


    if (
        !imageWidth ||
        !imageHeight
    ) {

        return;

    }


    const imageAspect =
        imageWidth /
        imageHeight;


    const viewerAspect =
        viewerWidth /
        viewerHeight;


    let displayedWidth;
    let displayedHeight;

    let offsetX;
    let offsetY;


    if (
        imageAspect >
        viewerAspect
    ) {

        displayedWidth =
            viewerWidth;

        displayedHeight =
            viewerWidth /
            imageAspect;

        offsetX =
            0;

        offsetY =
            (
                viewerHeight -
                displayedHeight
            ) / 2;

    } else {

        displayedHeight =
            viewerHeight;

        displayedWidth =
            viewerHeight *
            imageAspect;

        offsetY =
            0;

        offsetX =
            (
                viewerWidth -
                displayedWidth
            ) / 2;

    }


    const displayEyeX =
        offsetX +
        (
            eyeCenterX /
            imageWidth
        ) *
        displayedWidth;


    const displayEyeY =
        offsetY +
        (
            eyeCenterY /
            imageHeight
        ) *
        displayedHeight;


    const displayEyeDistance =
        eyeDistance *
        (
            displayedWidth /
            imageWidth
        );


    const cameraZ =
        camera.position.z;


    const visibleHeight =
        2 *
        cameraZ *
        Math.tan(
            THREE.MathUtils.degToRad(
                camera.fov / 2
            )
        );


    const visibleWidth =
        visibleHeight *
        camera.aspect;


    const worldX =
        (
            displayEyeX -
            viewerWidth / 2
        ) /
        viewerWidth *
        visibleWidth;


    const worldY =
        -(
            displayEyeY -
            viewerHeight / 2
        ) /
        viewerHeight *
        visibleHeight;


    const calibration =
        frameCalibration[
            selectedFrame
        ] ||
        frameCalibration.Wayfarer;


    glasses.position.x =
        worldX +
        calibration.x *
        0.5;


    glasses.position.y =
        worldY +
        calibration.y *
        0.5;


    let targetScale =
        displayEyeDistance /
        112;


    targetScale *=
        calibration.scale;


    targetScale *=
        1.0;


    targetScale =
        THREE.MathUtils.clamp(
            targetScale,
            0.30,
            2.20
        );


    glasses.scale.setScalar(
        targetScale
    );


    const eyeDX =
        rightCorner.x -
        leftCorner.x;


    const eyeDY =
        rightCorner.y -
        leftCorner.y;


    const targetRoll =
        Math.atan2(
            eyeDY,
            eyeDX
        );


    glasses.rotation.z =
        -targetRoll;


    const noseToLeft =
        Math.abs(
            nose.x -
            leftFace.x
        );


    const noseToRight =
        Math.abs(
            rightFace.x -
            nose.x
        );


    const faceWidth =
        Math.abs(
            rightFace.x -
            leftFace.x
        );


    if (
        faceWidth > 20
    ) {

        const yawRatio =
            (
                noseToRight -
                noseToLeft
            ) /
            faceWidth;


        let targetYaw =
            yawRatio *
            3.0;


        targetYaw =
            THREE.MathUtils.clamp(
                targetYaw,
                -0.75,
                0.75
            );


        glasses.rotation.y =
            targetYaw;

    }


    const faceHeight =
        Math.abs(
            chin.y -
            forehead.y
        );


    if (
        faceHeight > 20
    ) {

        const noseVertical =
            (
                nose.y -
                eyeCenterY
            ) /
            eyeDistance;


        let targetPitch =
            (
                noseVertical -
                0.42
            ) * 1.15;


        targetPitch =
            THREE.MathUtils.clamp(
                targetPitch,
                -0.55,
                0.55
            );


        glasses.rotation.x =
            targetPitch;

    }


    glasses.position.z =
        -0.12;


    smoothX =
        glasses.position.x;

    smoothY =
        glasses.position.y;

    smoothScale =
        targetScale;

    smoothRoll =
        targetRoll;

}


// ============================================================
// 36. EXIT PHOTO MODE
// ============================================================

function exitPhotoMode() {

    photoMode =
        false;

    photoFaceResult =
        null;


    const photoElement =
        document.getElementById(
            "uploadedPhoto"
        );


    if (
        photoElement
    ) {

        photoElement.remove();

    }


    if (
        photoObjectURL
    ) {

        URL.revokeObjectURL(
            photoObjectURL
        );

        photoObjectURL =
            null;

    }


    photoImage =
        null;


    scene.background =
        new THREE.Color(
            0xf2f2f2
        );

}


// ============================================================
// 37. STOP CAMERA
// ============================================================

function stopCamera() {

    trackingRunning =
        false;


    if (
        trackingAnimation
    ) {

        cancelAnimationFrame(
            trackingAnimation
        );

        trackingAnimation =
            null;

    }


    if (
        cameraStream
    ) {

        cameraStream
            .getTracks()
            .forEach(
                track => {

                    track.stop();

                }
            );

        cameraStream =
            null;

    }


    if (
        cameraVideo
    ) {

        cameraVideo.pause();

        cameraVideo.srcObject =
            null;

        cameraVideo.style.display =
            "none";

    }


    scene.background =
        new THREE.Color(
            0xf2f2f2
        );


    setStatus(
        "CAMERA OFF"
    );

}


// ============================================================
// 38. OPEN TRY ON
// ============================================================

function openTryOn() {

    const tryOn =
        document.getElementById(
            "tryon"
        );


    if (
        tryOn
    ) {

        tryOn.scrollIntoView({

            behavior:
                "smooth"

        });

    }

}


// ============================================================
// 39. ANIMATION
// ============================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    controls.update();


    renderer.render(
        scene,
        camera
    );

}


animate();


// ============================================================
// 40. RESIZE
// ============================================================

function resizeViewer() {

    const width =
        viewer.clientWidth;

    const height =
        viewer.clientHeight;


    if (
        width === 0 ||
        height === 0
    ) {

        return;

    }


    camera.aspect =
        width /
        height;


    camera.updateProjectionMatrix();


    renderer.setSize(
        width,
        height
    );


    if (
        photoMode &&
        photoFaceResult
    ) {

        fitPhotoGlasses(
            photoFaceResult
        );

    }

}


window.addEventListener(
    "resize",
    resizeViewer
);


// ============================================================
// 41. HELPER - AVERAGE POINTS
// ============================================================

function averagePoints(
    points,
    start,
    end
) {

    let x = 0;
    let y = 0;
    let count = 0;


    for (
        let i = start;
        i <= end;
        i++
    ) {

        x +=
            points[i].x;

        y +=
            points[i].y;

        count++;

    }


    return {

        x:
            x / count,

        y:
            y / count

    };

}


// ============================================================
// 42. HELPER - DISTANCE
// ============================================================

function distance(
    a,
    b
) {

    const dx =
        b.x -
        a.x;

    const dy =
        b.y -
        a.y;


    return Math.sqrt(
        dx * dx +
        dy * dy
    );

}


// ============================================================
// 43. HELPER - ANGLE LERP
// ============================================================

function lerpAngle(
    current,
    target,
    amount
) {

    let difference =
        target -
        current;


    while (
        difference >
        Math.PI
    ) {

        difference -=
            Math.PI * 2;

    }


    while (
        difference <
        -Math.PI
    ) {

        difference +=
            Math.PI * 2;

    }


    return (
        current +
        difference *
        amount
    );

}


// ============================================================
// 44. GLOBAL FUNCTIONS
// ============================================================

window.openTryOn =
    openTryOn;

window.startCamera =
    startCamera;

window.stopCamera =
    stopCamera;

window.selectPhoto =
    selectPhoto;

window.selectFrame =
    selectFrame;

window.exitPhotoMode =
    exitPhotoMode;


// ============================================================
// 45. READY
// ============================================================

console.log(
    "======================================"
);

console.log(
    "OPTIFIT READY"
);

console.log(
    "10 FRAMES LOADED"
);

console.log(
    "3D VIEWER READY"
);

console.log(
    "LIVE CAMERA READY"
);

console.log(
    "FACE TRACKING READY"
);

console.log(
    "UPLOAD PHOTO READY"
);

console.log(
    "PHOTO FACE FITTING ENABLED"
);

console.log(
    "FRAME INFORMATION PANEL ENABLED"
);

console.log(
    "======================================"
);
