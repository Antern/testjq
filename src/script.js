$( document ).ready( () => {
    console.log('onload123123123');
    $('.test-plugin').testPlugin([
        "https://picsum.photos/500/301",
        "https://picsum.photos/500/302",
        "https://picsum.photos/500/303",
        "https://picsum.photos/500/304",
        "https://picsum.photos/500/305",
        "https://picsum.photos/500/306",
        "https://picsum.photos/500/307"
    ]);
});