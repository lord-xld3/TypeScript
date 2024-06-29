// console.log macro
const z = (...args: any) => {
    console.log(...args)
};

{ // Assigning functions
    let a = {a: 1, b:1, c: true, undefined}
    let b = {0: -1, 1: 1}
    let c = { ...a, ...b };
    let d = {z, ...c} // Assigning properties to a function

    // Expect errors.
    try {
        d();
    } catch(e) {z("a = {b, ...c} throws: TypeError: not a function", true)}
    try {
        //Error
        Object.assign( {}, z )();
    } catch(e) {z("Object.assign({}, function(){})() throws: This expression is not callable:", true)}
}

{ // Copy properties to a function with Object.assign()
    let f = Object.assign(z, { a: 1 });
    f("Object.assign(target, {}) references the target function:", true)
    f("Can access property on Object.assign(z, { a: 1 }):", (f.a === 1))


    // f() is immutable.
    Object.assign(f, ()=>{})
    f("Cannot override a function with Object.assign():", true)

    f = ()=>{};
    z("Assigning a function to a function creates a new function:", (f() == undefined))
}

{ // Primitive objects
    let g = 3.01;
    let h = Object.assign(g, {
        setValue: (n: number) => {g = n}
    })

    z("Method on a primitive:", h)
    z("Object is == comparable to primitive:", (h == g))
    h.setValue(1.02)
    z("Method updates primitive:", (h.valueOf() != g))

    let j = 1.5
    let k = Object.assign(j, {
        setValue: (n: number) => {j = n}
    })
    h.setValue(3.01)
    z("Comparable to another primitive object:", (h > k))
    //Infer
    let m = Object.assign(z, h)
    z("Cannot assign primitive Object to a function:", (m === z) )
}

{ // Mutating a function
    let n = () => {}
    let o = Object.assign(n, {
        setFunc: (func: any) => n = func
    })
    o.setFunc( () => true)
    z("Mutating a function creates a new function:", n() && (o() === undefined))
}


{ // Copy function properties
    let p = Object.assign(z, Object.assign(z, { a: "a" }))
    //Infer
    let q = Object.assign({}, p)
    z("Can copy properties from a function to a function with Object.assign(): ", (p.a === "a"))
    z("Can copy properties from a function with Object.assign(): ", (q.a === "a"))
}

{ // Source primitives are not assigned
    //Infer
    let r = Object.assign({}, true)
    //Infer
    let s = Object.assign({}, "a")
    //Infer
    let t = Object.assign({}, 1)
    //Infer
    let u = Object.assign({}, true, {a: "a"})
    z("Object.assign({}, true) != true:", r != true)
    z("Object.assign({}, 1) != 1):", t != 1)
    z(`Object.assign({}, "a") != "a"):`, s != "a")
    //Fix: correct inference of 'u' discourages this fix.
    z("Primitive values skipped: ", (u.a === "a"));
    //Error
    (u != true)
}

{ // Anonymous functions
    let u = ()=>{}
    let t = Object.assign(u, ()=>{}, {a: "a"})
    //Error
    z("Can't assign properties from anonymous function:", (t.a === "a"))

    let v = Object.assign(()=>{}, {a: "a"})
    //Infer
    let w = Object.assign((...args: any)=>{z(...args)}, v)
    w("Can assign function properties to anonymous function:", (w.a === "a") )

    let x = Object.assign(()=>{}, {a: "a"})
    z("Can assign properties to anonymous function:", (x.a === "a"))
}

// Match overloads
Object.assign({}, {})
Object.assign(()=>{}, {a: "a"})
Object.assign(()=>{}, ()=>{})
Object.assign(true, {})
Object.assign(true, ()=>{})