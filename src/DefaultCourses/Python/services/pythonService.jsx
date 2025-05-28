import axios from 'axios';

// This would normally fetch from our server, but for demo purposes we'll use mock data
export const fetchPythonTopics = async () => {
  try {
    // In a real application, this would call our proxy server
    // const response = await axios.get('/api/python-topics');
    // return response.data;
    
    // For demo purposes, return mock data
    return mockPythonTopics;
  } catch (error) {
    console.error('Error fetching Python topics:', error);
    throw error;
  }
};

// Mock data representing Python topics from W3Schools
const mockPythonTopics= [
  {
    id: 'python-basics',
    title: 'Python Basics',
    subtopics: [
      {
        id: 'intro',
        title: 'Python Introduction',
        content: `
          <h2>What is Python?</h2>
          <p>Python is a popular programming language created by Guido van Rossum in 1991. It is known for its simplicity, readability, and versatility, making it a great language for beginners and professionals alike.</p>
          
          <h3>Key Features of Python:</h3>
          <ul>
            <li>Easy-to-learn syntax, which reduces the cost of program maintenance.</li>
            <li>Dynamic typing and memory management.</li>
            <li>Wide range of libraries and frameworks for tasks like data analysis, web development, machine learning, etc.</li>
            <li>Cross-platform language that runs on different operating systems.</li>
          </ul>
          
          <h2>What can Python do?</h2>
          <ul>
            <li>Python can be used to create web applications using frameworks like Django and Flask.</li>
            <li>It is widely used for scientific computing with libraries like NumPy, SciPy, and Pandas.</li>
            <li>Python is great for automation, data manipulation, and web scraping.</li>
            <li>It can integrate with databases, handle large datasets, and process files.</li>
            <li>Python is used in many fields, including artificial intelligence, robotics, and scientific research.</li>
          </ul>
        `,
        examples: [
          {
            code: 'print("Hello, World!")',
            explanation: 'This is the traditional first program that prints "Hello, World!" to the console. It demonstrates the basic structure of a Python program.'
          },
          {
            code: 'print("This is Python.")',
            explanation: 'Another basic example that shows Python\'s ability to print simple strings to the console.'
          }
        ]
      },
      {
        id: 'syntax',
        title: 'Python Syntax',
        content: `
          <h2>Python Syntax</h2>
          <p>Python's syntax is easy to read and write. It is designed to be concise, using fewer lines of code than many other programming languages.</p>
          
          <h3>Indentation</h3>
          <p>Unlike other languages, Python uses indentation instead of curly braces to define blocks of code. This enforces clean, readable code.</p>
          <p>For example, all code inside an <code>if</code> block must be indented by the same number of spaces or tabs. Python uses indentation levels to determine the grouping of statements.</p>
          
          <h3>Comments</h3>
          <p>Comments in Python start with a <code>#</code>. These comments are not executed by the program and are used to explain the code.</p>
        `,
        examples: [
          {
            code: 'if 5 > 2:\n  print("Five is greater than two!")',
            explanation: 'This example shows Python\'s indentation rule. The code inside the <code>if</code> block must be indented.'
          },
          {
            code: 'print("Hello")\n# This is a comment\nprint("World")',
            explanation: 'This demonstrates how comments are used to add non-executable explanations to the code.'
          },
          {
            code: 'if 5 > 2: print("Five is greater than two!")\n# This code lacks indentation, which can lead to errors.',
            explanation: 'Error: If we remove indentation, we will get an IndentationError because Python expects indented blocks under conditions like <code>if</code>.'
          }
        ]
      },
      {
        id: 'variables',
        title: 'Python Variables',
        content: `
          <h2>Variables in Python</h2>
          <p>In Python, variables are used to store data. A variable name is simply a label for a value in memory, and Python is dynamically typed, which means you do not need to declare the type explicitly.</p>
          
          <h3>Creating Variables</h3>
          <p>A variable is created when you assign a value to it using the assignment operator (<code>=</code>). Python automatically detects the type of value based on what you assign.</p>
          
          <h3>Variable Naming Rules</h3>
          <ul>
            <li>Variable names must start with a letter (a-z, A-Z) or an underscore (_).</li>
            <li>The rest of the name can contain letters, numbers, or underscores.</li>
            <li>Python is case-sensitive, so <code>variable</code> and <code>Variable</code> are two different variables.</li>
          </ul>
        `,
        examples: [
          {
            code: 'x = 5\ny = "Hello, World!"\nprint(x)\nprint(y)',
            explanation: 'This creates two variables: <code>x</code> with a numeric value and <code>y</code> with a string value. Python handles these dynamically based on assignment.'
          },
          {
            code: 'x = 5\ny = "Hello, World!"\nprint(x + y)',
            explanation: 'Error: Python raises a TypeError because you cannot concatenate an integer and a string directly.'
          }
        ]
      },
      {
        id: 'data-types',
        title: 'Python Data Types',
        content: `
          <h2>Data Types</h2>
          <p>In Python, there are several built-in data types that you can use to store different kinds of data. These include:</p>
          <ul>
            <li>String: <code>str</code> - used for storing text.</li>
            <li>Integer: <code>int</code> - used for storing whole numbers.</li>
            <li>Float: <code>float</code> - used for storing decimal numbers.</li>
            <li>Boolean: <code>bool</code> - used for storing True or False values.</li>
            <li>List: <code>list</code> - used for storing ordered collections of items.</li>
            <li>Tuple: <code>tuple</code> - similar to lists but immutable.</li>
            <li>Dictionary: <code>dict</code> - stores key-value pairs.</li>
            <li>Set: <code>set</code> - stores unordered collections of unique items.</li>
            <li>None: <code>NoneType</code> - represents the absence of a value.</li>
          </ul>
        `,
        examples: [
          {
            code: 'x = "Hello"\ny = 10\nz = 10.5\nw = True',
            explanation: 'Examples of different data types: string, integer, float, and boolean.'
          },
          {
            code: 'x = 10\nx = "Hello World"\nprint(type(x))',
            explanation: 'This shows how Python dynamically changes the type of a variable.'
          }
        ]
      }
    ]
  },
  {
    id: 'python-collections',
    title: 'Python Collections',
    subtopics: [
      {
        id: 'lists',
        title: 'Python Lists',
        content: `
          <h2>Python Lists</h2>
          <p>Lists in Python are ordered collections that are mutable (changeable) and allow duplicate elements.</p>
          <p>Lists can store elements of different data types, and they are created using square brackets.</p>
          
          <h3>Accessing and Modifying Lists</h3>
          <p>List elements can be accessed using their index, with the first item having index 0. Lists can be modified by adding, removing, or changing elements.</p>
        `,
        examples: [
          {
            code: 'mylist = ["apple", "banana", "cherry"]\nprint(mylist[1])',
            explanation: 'Access the second element of the list (index starts at 0).'
          },
          {
            code: 'mylist = ["apple", "banana", "cherry"]\nmylist[1] = "orange"\nprint(mylist)',
            explanation: 'Modify an element in the list by changing its value at index 1.'
          },
          {
            code: 'mylist = ["apple", "banana", "cherry"]\nmylist.append("orange")\nprint(mylist)',
            explanation: 'Add a new element to the end of the list using the <code>append()</code> method.'
          },
          {
            code: 'mylist = ["apple", "banana", "cherry"]\nmylist[5] = "orange"\nprint(mylist)',
            explanation: 'Error: IndexError because index 5 is out of range.'
          }
        ]
      },
      {
        id: 'tuples',
        title: 'Python Tuples',
        content: `
          <h2>Python Tuples</h2>
          <p>Tuples are similar to lists, but they are immutable (cannot be modified after creation).</p>
          <p>They are created using round brackets and are often used to store fixed data that shouldn't change.</p>
        `,
        examples: [
          {
            code: 'thistuple = ("apple", "banana", "cherry")\nprint(thistuple)',
            explanation: 'This example demonstrates how to create and print a tuple.'
          },
          {
            code: 'thistuple = ("apple", "banana", "cherry")\nthistuple[1] = "orange"\nprint(thistuple)',
            explanation: 'Error: TypeError because tuples are immutable and cannot be modified.'
          }
        ]
      }
    ]
  },
  {
    id: 'python-control-flow',
    title: 'Python Control Flow',
    subtopics: [
      {
        id: 'if-else',
        title: 'Python If...Else',
        content: `
          <h2>Python If...Else</h2>
          <p>The <code>if</code> statement is used to check a condition. If the condition is <code>True</code>, a block of code will execute. If the condition is <code>False</code>, the program will execute the code in the <code>else</code> block.</p>
          
          <h3>Syntax</h3>
          <pre><code>if condition:
    # code to execute
else:
    # code to execute if condition is False</code></pre>
          
          <h3>Multiple Conditions</h3>
          <p>Python allows you to chain multiple conditions with <code>elif</code> (else if) for checking more than two conditions.</p>
          <pre><code>if condition1:
    # code
elif condition2:
    # code
else:
    # code</code></pre>

          <h3>Nested If Statements</h3>
          <p>You can nest <code>if</code> statements inside each other. It allows for complex condition checking and better control of the flow.</p>
          <pre><code>if condition1:
    if condition2:
        # code for both conditions being true
    else:
        # code for condition1 true and condition2 false
else:
    # code for condition1 false</code></pre>
        `,
        examples: [
          {
            code: 'x = 10\nif x > 5:\n  print("x is greater than 5")',
            explanation: 'The condition checks if <code>x</code> is greater than 5, and since it is, it prints the message.'
          },
          {
            code: 'x = 2\nif x > 5:\n  print("x is greater than 5")\nelse:\n  print("x is not greater than 5")',
            explanation: 'This example demonstrates an <code>else</code> block, which executes when the condition is <code>False</code>.'
          },
          {
            code: 'x = 3\nif x > 5:\n  print("x is greater than 5")\nelif x == 3:\n  print("x is 3")',
            explanation: 'Error: The <code>elif</code> condition is executed when <code>x</code> is not greater than 5, and is equal to 3.'
          }
        ]
      },
      {
        id: 'match',
        title: 'Python Match (Pattern Matching)',
        content: `
          <h2>Python Match</h2>
          <p>Pattern matching in Python is a powerful feature introduced in Python 3.10. It is used to match complex data structures and evaluate them based on conditions.</p>
          
          <h3>Syntax</h3>
          <pre><code>match variable:
  case pattern1:
    # code
  case pattern2:
    # code</code></pre>

          <h3>Using Match with Data Types</h3>
          <p>Pattern matching works well with data types like lists, dictionaries, and custom objects. It allows matching on various data types with a clean syntax.</p>
          <pre><code>match value:
  case 1:
    print("It's 1")
  case [x, y] if x > y:
    print(f"First is larger: {x}")
  case _:
    print("No match")</code></pre>
        `,
        examples: [
          {
            code: 'x = "apple"\nmatch x:\n  case "apple":\n    print("Fruit is apple")\n  case "banana":\n    print("Fruit is banana")',
            explanation: 'This demonstrates basic pattern matching where the string <code>x</code> is matched against different patterns.'
          },
          {
            code: 'x = 5\nmatch x:\n  case 5:\n    print("x is 5")\n  case 10:\n    print("x is 10")',
            explanation: 'Pattern matching checks if the value of <code>x</code> matches 5 or 10 and prints the appropriate message.'
          },
          {
            code: 'x = 10\nmatch x:\n  case 5:\n    print("x is 5")\n  case 10:\n    print("x is 10")\n  case 20:\n    print("x is 20")',
            explanation: 'This example demonstrates that pattern matching can match more than one case, but only the first match will be executed.'
          }
        ]
      },
      {
        id: 'while-loops',
        title: 'Python While Loops',
        content: `
          <h2>Python While Loops</h2>
          <p>The <code>while</code> loop in Python is used to repeatedly execute a block of code as long as a condition remains <code>True</code>.</p>
          
          <h3>Syntax</h3>
          <pre><code>while condition:
    # code to execute</code></pre>
          
          <h3>Breaking out of a while loop</h3>
          <p>You can use the <code>break</code> statement to exit the loop prematurely if a condition is met.</p>
          
          <h3>Else in While Loops</h3>
          <p>In Python, <code>else</code> can be used in conjunction with a <code>while</code> loop. The code inside the <code>else</code> block will execute only when the loop terminates normally (not using <code>break</code>).</p>
          <pre><code>while condition:
    # code to execute
else:
    print("Loop finished without break")</code></pre>
        `,
        examples: [
          {
            code: 'i = 0\nwhile i < 5:\n  print(i)\n  i += 1',
            explanation: 'This code runs a loop from <code>i = 0</code> to <code>i = 4</code>, printing each value of <code>i</code>.'
          },
          {
            code: 'i = 0\nwhile i < 5:\n  if i == 3:\n    break\n  print(i)\n  i += 1',
            explanation: 'The <code>break</code> statement is used to exit the loop when <code>i</code> equals 3.'
          },
          {
            code: 'i = 0\nwhile i < 5:\n  print(i)\n  # Missing increment\n',
            explanation: 'Error: This loop will result in an infinite loop because <code>i</code> is never incremented.'
          }
        ]
      }
    ]
  },
  {
    id: 'python-functions',
    title: 'Python Functions',
    subtopics: [
      {
        id: 'functions',
        title: 'Python Functions',
        content: `
          <h2>Python Functions</h2>
          <p>A function in Python is a block of code that only runs when it is called. Functions are defined using the <code>def</code> keyword.</p>
          
          <h3>Syntax</h3>
          <pre><code>def function_name(parameters):
    # code to execute</code></pre>
          
          <h3>Returning values from functions</h3>
          <p>Functions can also return values using the <code>return</code> statement.</p>
          
          <h3>Default Arguments</h3>
          <p>Python allows functions to have default arguments, which provide default values if no argument is provided during the function call.</p>
          <pre><code>def greet(name="Guest"):
    return f"Hello, {name}!"</code></pre>
        `,
        examples: [
          {
            code: 'def greet(name):\n  return f"Hello, {name}!"\nprint(greet("Alice"))',
            explanation: 'This function takes an argument <code>name</code> and returns a greeting string.'
          },
          {
            code: 'def add(a, b):\n  return a + b\nprint(add(5, 3))',
            explanation: 'This function adds two numbers and returns the result.'
          },
          {
            code: 'def add(a, b):\n  print(a + b)\nadd(5, "hello")',
            explanation: 'Error: TypeError because you cannot add an integer and a string.'
          },
          {
            code: 'def greet(name="Guest"):\n  return f"Hello, {name}!"\nprint(greet())\nprint(greet("Alice"))',
            explanation: 'In this example, <code>greet</code> has a default argument, which is used when no value is provided.'
          }
        ]
      },
      {
        id: 'lambda',
        title: 'Python Lambda Functions',
        content: `
          <h2>Python Lambda</h2>
          <p>Lambda functions are small anonymous functions that can have any number of arguments but only one expression. They are often used for short, throwaway functions.</p>
          
          <h3>Syntax</h3>
          <pre><code>lambda arguments: expression</code></pre>
          
          <h3>Lambda Use Cases</h3>
          <p>Lambda functions are commonly used with functions like <code>filter()</code>, <code>map()</code>, and <code>sorted()</code> for concise, inline operations.</p>
        `,
        examples: [
          {
            code: 'x = lambda a, b: a + b\nprint(x(5, 3))',
            explanation: 'This example defines a lambda function that adds two numbers and prints the result.'
          },
          {
            code: 'x = lambda a: a * 2\nprint(x(5))',
            explanation: 'This lambda function doubles the input value.'
          },
          {
            code: 'x = lambda a, b: a + b\nprint(x(5))',
            explanation: 'Error: Missing second argument for the lambda function.'
          },
          {
            code: 'numbers = [1, 2, 3, 4, 5]\nsquared = list(map(lambda x: x**2, numbers))\nprint(squared)',
            explanation: 'This example uses lambda with the <code>map</code> function to square each number in the list.'
          }
        ]
      }
    ]
  },
  {
    id: 'python-classes',
    title: 'Python Object-Oriented Programming',
    subtopics: [
      {
        id: 'classes-objects',
        title: 'Python Classes/Objects',
        content: `
          <h2>Python Classes and Objects</h2>
          <p>In Python, a class is a blueprint for creating objects. Objects represent instances of a class.</p>
          
          <h3>Defining a Class</h3>
          <pre><code>class ClassName:
    def __init__(self, param1, param2):
        self.param1 = param1
        self.param2 = param2</code></pre>
          
          <h3>Creating Objects</h3>
          <p>Once a class is defined, you can create objects by calling the class as if it were a function.</p>
          
          <h3>Class Attributes and Methods</h3>
          <p>Attributes are variables bound to the class, and methods are functions bound to the class.</p>
        `,
        examples: [
          {
            code: 'class Person:\n  def __init__(self, name, age):\n    self.name = name\n    self.age = age\np1 = Person("Alice", 30)\nprint(p1.name)',
            explanation: 'This example creates a Person class and an object <code>p1</code> with attributes <code>name</code> and <code>age</code>.'
          },
          {
            code: 'class Person:\n  def __init__(self, name, age):\n    self.name = name\n    self.age = age\np1 = Person("Alice", "thirty")\nprint(p1.name)',
            explanation: 'Error: There is a type mismatch; age should be an integer.'
          }
        ]
      },
      {
        id: 'inheritance',
        title: 'Python Inheritance',
        content: `
          <h2>Python Inheritance</h2>
          <p>Inheritance allows one class to inherit the properties and methods of another class. This is a way to create a new class from an existing class.</p>
          
          <h3>Syntax</h3>
          <pre><code>class DerivedClass(BaseClass):
    # additional code</code></pre>
        `,
        examples: [
          {
            code: 'class Animal:\n  def sound(self):\n    return "Generic Animal Sound"\nclass Dog(Animal):\n  def sound(self):\n    return "Woof"\ndog = Dog()\nprint(dog.sound())',
            explanation: 'This example demonstrates inheritance where the Dog class inherits from Animal, but overrides the <code>sound</code> method.'
          },
          {
            code: 'class Animal:\n  def sound(self):\n    return "Generic Animal Sound"\nclass Cat(Animal):\n  pass\ncat = Cat()\nprint(cat.sound())',
            explanation: 'In this example, Cat class inherits Animal without overriding any methods, so it uses the <code>sound</code> method from Animal.'
          }
        ]
      }
    ]
  },
  {
    id: 'python-encapsulation',
    title: 'Python Encapsulation',
    subtopics: [
      {
        id: 'private-variables',
        title: 'Private Variables and Getter/Setter Methods',
        content: `
          <h2>What is Encapsulation?</h2>
          <p>Encapsulation is the concept of hiding the internal state of an object and only exposing the necessary attributes or methods. In Python, private variables are typically prefixed with <code>_</code> or <code>__</code> to indicate that they should not be accessed directly.</p>

          <h3>Private Variables</h3>
          <p>Private variables can only be accessed within the class that defines them. To access them from outside, we use getter and setter methods.</p>

          <h3>Getters and Setters</h3>
          <p>These methods allow controlled access to private variables. You can use getters to retrieve the value of a variable, and setters to modify the value, optionally adding validation checks.</p>
        `,
        examples: [
          {
            code: 'class Person:\n  def __init__(self, name):\n    self.__name = name\n  def get_name(self):\n    return self.__name\n  def set_name(self, name):\n    if len(name) > 3:  # validation\n      self.__name = name\n    else:\n      print("Invalid name")\np = Person("John")\np.set_name("Mike")\nprint(p.get_name())',
            explanation: 'This demonstrates encapsulation with private attributes and the use of getter and setter methods to access and modify the private variable.'
          }
        ]
      }
    ]
  },
  {
    id: 'python-polymorphism',
    title: 'Python Polymorphism',
    subtopics: [
      {
        id: 'method-overriding',
        title: 'Method Overriding',
        content: `
          <h2>What is Polymorphism?</h2>
          <p>Polymorphism allows different classes to implement the same method in different ways. The most common use case is method overriding, where a subclass provides a specific implementation of a method that is already defined in the parent class.</p>
          
          <h3>Method Overriding</h3>
          <p>When a method in the child class has the same name as a method in the parent class, the child class's method overrides the parent class's method.</p>
        `,
        examples: [
          {
            code: 'class Animal:\n  def speak(self):\n    return "Some generic animal sound"\n\nclass Dog(Animal):\n  def speak(self):\n    return "Woof"\n\nclass Cat(Animal):\n  def speak(self):\n    return "Meow"\n\nanimals = [Dog(), Cat()]\nfor animal in animals:\n  print(animal.speak())',
            explanation: 'This example demonstrates method overriding, where the <code>Dog</code> and <code>Cat</code> classes implement their own version of the <code>speak</code> method.'
          }
        ]
      }
    ]
  },
  {
    id: 'python-abstract-classes',
    title: 'Python Abstract Classes',
    subtopics: [
      {
        id: 'abstract-classes-methods',
        title: 'Abstract Classes and Methods',
        content: `
          <h2>What is an Abstract Class?</h2>
          <p>An abstract class is a class that cannot be instantiated and must be inherited by subclasses. It can define abstract methods that must be implemented by the subclasses.</p>

          <h3>Abstract Methods</h3>
          <p>Abstract methods are methods declared in the abstract class but without implementation. Subclasses must provide their own implementation of these methods.</p>
        `,
        examples: [
          {
            code: 'from abc import ABC, abstractmethod\n\nclass Animal(ABC):\n  @abstractmethod\n  def speak(self):\n    pass\n\nclass Dog(Animal):\n  def speak(self):\n    return "Woof"\ndog = Dog()\nprint(dog.speak())',
            explanation: 'This example demonstrates an abstract class <code>Animal</code> with an abstract method <code>speak</code>. The <code>Dog</code> class implements this method.'
          },
          {
            code: 'from abc import ABC, abstractmethod\n\nclass Animal(ABC):\n  @abstractmethod\n  def speak(self):\n    pass\n\nanimal = Animal()',
            explanation: 'Error: Trying to instantiate an abstract class will result in a TypeError.'
          }
        ]
      }
    ]
  },
  {
    id: 'python-exception-handling',
    title: 'Python Exception Handling',
    subtopics: [
      {
        id: 'try-except-finally',
        title: 'Try, Except, and Finally',
        content: `
          <h2>What is Exception Handling?</h2>
          <p>Exception handling allows you to deal with errors gracefully using the <code>try</code>, <code>except</code>, and <code>finally</code> blocks.</p>

          <h3>Try and Except</h3>
          <p>The <code>try</code> block is used to write code that might raise an exception. If an exception occurs, the <code>except</code> block will execute.</p>

          <h3>Finally Block</h3>
          <p>The <code>finally</code> block is always executed after the <code>try</code> block, regardless of whether an exception occurred or not.</p>
        `,
        examples: [
          {
            code: 'try:\n  x = 1 / 0\nexcept ZeroDivisionError:\n  print("Cannot divide by zero!")\nfinally:\n  print("This will run no matter what.")',
            explanation: 'This example demonstrates exception handling using <code>try</code>, <code>except</code>, and <code>finally</code> to manage the division by zero error.'
          }
        ]
      }
    ]
  },
  {
    id: 'python-file-handling',
    title: 'Python File Handling',
    subtopics: [
      {
        id: 'file-operations',
        title: 'Reading and Writing Files',
        content: `
          <h2>What is File Handling?</h2>
          <p>File handling allows you to read and write files using Python. You can open files, read from them, write to them, and close them after use.</p>

          <h3>Opening and Closing Files</h3>
          <p>Use the <code>open()</code> function to open a file, and use the <code>close()</code> function to close it when you're done.</p>

          <h3>Reading from Files</h3>
          <p>You can read from a file using methods like <code>read()</code>, <code>readline()</code>, or <code>readlines()</code>.</p>
        `,
        examples: [
          {
            code: 'with open("file.txt", "w") as file:\n  file.write("Hello, World!")\nwith open("file.txt", "r") as file:\n  print(file.read())',
            explanation: 'This demonstrates how to write to a file and then read its content using the <code>with</code> statement, which automatically handles closing the file.'
          },
          {
            code: 'with open("file.txt", "r") as file:\n  content = file.read()\n  print(content)',
            explanation: 'This demonstrates reading the content of a file and printing it to the console.'
          }
        ]
      }
    ]
  },
  {
    id: 'python-comprehensions',
    title: 'Python Comprehensions',
    subtopics: [
      {
        id: 'list-comprehension',
        title: 'List Comprehensions',
        content: `
          <h2>What is List Comprehension?</h2>
          <p>List comprehension provides a concise way to create lists. It consists of an expression followed by a  <code>for</code> loop inside square brackets.</p>

          <h3>Syntax</h3>
          <pre><code>[expression for item in iterable]</code></pre>

          <h3>List Comprehension with Condition</h3>
          <p>List comprehensions can also include an optional condition at the end to filter out items.</p>
          <pre><code>[expression for item in iterable if condition]</code></pre>
        `,
        examples: [
          {
            code: 'numbers = [1, 2, 3, 4, 5]\nsquares = [x**2 for x in numbers]\nprint(squares)',
            explanation: 'This creates a list of squares from the original <code>numbers</code> list using list comprehension.'
          },
          {
            code: 'even_numbers = [x for x in range(10) if x % 2 == 0]\nprint(even_numbers)',
            explanation: 'This filters the numbers from 0 to 9, only keeping the even numbers using a condition in list comprehension.'
          }
        ]
      }
    ]
  }
];