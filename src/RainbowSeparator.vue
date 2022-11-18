<template>
    <div></div>
</template>

<style scoped>
div {
    margin: 4em auto 4em;
}

div::after,
div::before {
    display: inline-block;
    content: " ";
    width: 100px;
    height: 100px;
}

div::before {
    border-top-left-radius: 150%;
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
    border-top-right-radius: 100%;
    box-shadow:
        -5px 5px 0 5px rgb(243, 19, 19) inset,
        -10px 10px 0 10px rgb(255, 145, 0) inset,
        -15px 15px 0 15px rgb(252, 223, 3) inset,
        -20px 20px 0 20px rgb(5, 232, 5) inset,
        -25px 25px 0 25px rgb(59, 135, 249) inset,
        -30px 30px 0 30px rgb(196, 98, 226) inset,
        -35px 35px 0 35px rgb(103, 28, 190) inset;
}
</style>
