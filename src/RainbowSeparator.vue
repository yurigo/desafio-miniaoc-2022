<template>
    <div class="rainbow">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<style scoped>
div.rainbow {
    position: relative;
    width: 200px;
    height: 100px;
    margin: 4em auto 4em;
}

div.rainbow>div {
    position: absolute;
    top: 0px;
    width: 200px;
    height: 100px;
    border-radius: 110px 110px 0 0;
    /* box-shadow:
        0px 0px 0 10px rgb(243, 19, 19) inset,
        0px 0px 0 20px rgb(255, 145, 0) inset,
        0px 0px 0 30px rgb(252, 223, 3) inset,
        0px 0px 0 40px rgb(5, 232, 5) inset,
        0px 0px 0 50px rgb(59, 135, 249) inset,
        0px 0px 0 60px rgb(196, 98, 226) inset,
        0px 0px 0 70px rgb(103, 28, 190) inset; */

}

div.rainbow>div:nth-child(7) {
    border: 10px solid rgb(243, 19, 19);
    border-bottom: 0;
}

div.rainbow>div:nth-child(6) {
    border: 20px solid rgb(255, 145, 0);
    border-bottom: 0;
}

div.rainbow>div:nth-child(5) {
    border: 30px solid rgb(252, 223, 3);
    border-bottom: 0;
}

div.rainbow>div:nth-child(4) {
    border: 40px solid rgb(5, 232, 5);
    border-bottom: 0;
}

div.rainbow>div:nth-child(3) {
    border: 50px solid rgb(59, 135, 249);
    border-bottom: 0;
}

div.rainbow>div:nth-child(2) {
    border: 60px solid rgb(196, 98, 226);
    border-bottom: 0;
}

div.rainbow>div:nth-child(1) {
    border: 70px solid rgb(103, 28, 190);
    border-bottom: 0;
}

/* div::after,
div::before {
    display: inline-block;
    content: " ";
    width: 100px;
    height: 100px;
    -webkit-appearance: none;
    appearance: none;
} */

/* div::before {
    border-radius: 100% 0 0 0;
    box-shadow:
        5px 5px 0 5px rgb(243, 19, 19) inset,
        10px 10px 0 10px rgb(255, 145, 0) inset,
        15px 15px 0 15px rgb(252, 223, 3) inset,
        20px 20px 0 20px rgb(5, 232, 5) inset,
        25px 25px 0 25px rgb(59, 135, 249) inset,
        30px 30px 0 30px rgb(196, 98, 226) inset,
        35px 35px 0 35px rgb(103, 28, 190) inset;
}

div::after {
    border-top-right-radius: 100px;
    box-shadow:
        -5px 5px 0 5px rgb(243, 19, 19) inset,
        -10px 10px 0 10px rgb(255, 145, 0) inset,
        -15px 15px 0 15px rgb(252, 223, 3) inset,
        -20px 20px 0 20px rgb(5, 232, 5) inset,
        -25px 25px 0 25px rgb(59, 135, 249) inset,
        -30px 30px 0 30px rgb(196, 98, 226) inset,
        -35px 35px 0 35px rgb(103, 28, 190) inset;
} */
</style>
