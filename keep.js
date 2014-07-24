(function() {
    var a = 0; // `a` is NOT a property of `window` now

    function foo() {
        alert(a);   // Alerts "0", because `foo` can access `a`
    }
})();
