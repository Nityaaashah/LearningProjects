window.addEventListener("load",()=>{
    const sounds = document.querySelectorAll(".sound");
    const pads  = document.querySelectorAll(".pads div");
    const visuals = document.querySelector(".visual");
    const colors = [
        "#60d394",
        "#d36060",
        "#c060d3",
        "#d3d160",
        "#60c2d3",
        "#606bd3",
    ];

//Lets get going with the sounds here//
pads.forEach((pads , index )=>
{
    pads.addEventListener('click',function(){
        createBubbles(index);
            sounds[index].currentTime = 0;
            sounds[index].play();

           
        });
    });

//crete the function that create bubble//
const createBubbles = (index) =>{
    const bubbles = document.createElement("div");
    visuals.appendChild(bubbles);
    bubbles.style.background = colors[index];
    bubbles.style.animation = "jump 1s ease";
    bubbles.addEventListener("animationend",function(){
        visuals.removeChild(this);
    })
}


});