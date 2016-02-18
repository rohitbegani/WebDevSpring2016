(function () {
//        alert("Hello World!");
    var a = 2;
    var b = 4;
//        var c = a + b;
    var c = Math.pow(a, b);
//        alert(c);
    var fact = 1;
    for (var i = 1; i <= 5; i++) {
        fact = fact * i;
    }
//        alert("Factorial of 5 = " + fact);
    var arr = [12, 43, 45, 64, 45, 68, 34, 87, 23, 34, 76, 67, 23];
    var min = arr[0];
    var max = arr[0];
    for (var j = 0; j <= arr.length; j++) {
        if (arr[j] > max) {
            max = arr[j];
        }
        if (arr[j] < min) {
            min = arr[j];
        }
    }
    alert("The min is:" + min);
    alert("The max is:" + max);

    var min2 = minFunc(arr);
    alert("Min2:" + min2);

    function minFunc(arr) {
        var min = arr[0];
        console.log(min);
        for (var i = 0; i <= arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }
        return min;
    }
})();