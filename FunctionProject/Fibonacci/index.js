module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const memo = {};

    function fibonacci(n) {
        if (n < 0) throw 'must be greater than 0';
        if (n === 0) return 0;
        if (n === 1) return 1;
        if (memo[n]) return memo[n];
        memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
        return memo[n];
    }

    try {
        const nth = req.body.nth;
        const result = fibonacci(nth);

        context.res = {
            body: result.toString()
        };
    } catch (error) {
        context.res = {
            status: 400,
            body: error.toString()
        };
    }
};