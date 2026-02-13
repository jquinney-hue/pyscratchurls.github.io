PyScratch.registerPlugin({
    name: "Python Random Library",
    impl: `
    class PythonRandom {
        constructor() {
            this._seed = Date.now();
        }

        // Sets the seed for the random number generator
        seed(s) {
            // Simple string hashing to number if string provided
            if (typeof s === 'string') {
                let h = 0;
                for (let i = 0; i < s.length; i++) {
                    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
                }
                s = h;
            }
            this._seed = s >>> 0; // Ensure integer
        }

        // Returns a float between 0.0 and 1.0
        // Uses a Linear Congruential Generator (LCG) to allow seeding
        random() {
            this._seed = (this._seed * 1664525 + 1013904223) % 4294967296;
            return this._seed / 4294967296;
        }

        // Returns an integer between min and max (inclusive)
        randint(min, max) {
            return Math.floor(this.random() * (max - min + 1)) + min;
        }
        
        // Returns a random choice from an array (extra utility)
        choice(arr) {
            if (!Array.isArray(arr) || arr.length === 0) return null;
            return arr[this.randint(0, arr.length - 1)];
        }
    }
    
    // Instantiate as 'random' to match Python syntax (random.randint)
    const random = new PythonRandom();
    `,
    docs: [
        {name: "random.seed", params: "value", desc: "Initialize the random number generator"},
        {name: "random.random", params: "", desc: "Return the next random floating point number in the range [0.0, 1.0)"},
        {name: "random.randint", params: "min, max", desc: "Return a random integer N such that a <= N <= b"},
        {name: "random.choice", params: "list", desc: "Return a random element from a list"}
    ]
});
