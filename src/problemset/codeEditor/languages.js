export const LANGUAGE_VERSION = {
  javascript: "20.11.1",   // Matches `ppman list` version for node
  python: "3.12.0",
  java: "15.0.2"
};

export const LANGUAGE_BOILERPLATE = {
  javascript: `// JavaScript Boilerplate
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("World"));`,

  python: `# Python Boilerplate
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,

  java: `// Java Boilerplate
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`
};




/*

// MY code

// (1) Input

testcases is an array of testcases like [
  {
    "input":"",
    "output": ""
  }, 
  {
    "input":"",
    "output": ""
  },
  ....
]

"testcases": [
  {
      "input": "5",
      "output": "120"
  }
]


http://localhost:2000/api/v2/execute
-H "Content-Type: application/json"
-d '{
  "language": {language},
  "version": {LANGUAGE_VERSION[language]},
  "files": [
    { 
      "name": "main.py", 
      "content": {code} 
    }
  ],
  "stdin": {testcases} 
}'


if (all testcases pass){
  (1) 
  Accepted heading
  submitted at date --date--

  (2) show 
  testcase 1 passed + tick
  testcase 2 passed + tick
  ...

  (3) show 
  "cpu_time":1012.9999999999999, // runtime heading
  "wall_time":660
}
else if (even one test case failed){
  show
  (1) Input
    testcases[index of testcase].input

  (2) Output
    run.output
  
  (3) Expected
    testcases[index of testcase].output
}

*/