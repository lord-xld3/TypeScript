/* These should emit a Warning. returns new instance of (Boolean | String | Number) */
const a = Object.assign(true,{},{},{},{})
const b = Object.assign('s',{},{},{},{})
const c = Object.assign(3,{},{},{},{})

/* This should emit an Error: Assigning a function to an object does not make the object callable */
const d = Object.assign({}, function(){})();

/* Properties can still be assigned to a function object */
const e = Object.assign(function(){}, {prop: 'a'})
e.prop;

/* EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' 
is not an allowed source of script in the following Content Security Policy directive:...
*/
const f = Object.assign(new Function, {prop: 'a'})
f.prop;

/* These should emit warnings: T will not be assigned */
const g = Object.assign({}, true)
const h = Object.assign({}, 'a')
const i = Object.assign({}, 3)
const j = Object.assign({}, Boolean)
const k = Object.assign({}, String)
const l = Object.assign({}, Number)
const m = Object.assign({}, null)
const n = Object.assign({}, undefined)

/* Functions with properties can be assigned to a function, 
copying the properties of the source function.
*/
const o = Object.assign(function(arg1: string){console.log(arg1, 'src')}, {a: 'b'})
const p = Object.assign(function(arg2: number){console.log(arg2, 'tgt')}, o)
p.a;
p('arg');