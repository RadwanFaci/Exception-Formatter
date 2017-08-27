//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("C# Stack Trace Tests", () => {

    // Defines a Mocha unit test
    test("C# Stack Trace 1", () => {
        let expectedStackTrace = 
`Unhandled Exception: System.NotSupportedException: Foo is not supported.
  ---> System.Exception: Baz threw an exception!
  ---> System.NotImplementedException: Not yet implemented!
    at ConsoleApp1.ThrowException.Qux() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 83
    at ConsoleApp1.ThrowException.Baz() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 71
    at ConsoleApp1.ThrowException.Bar() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 55
    --- End of inner exception stack trace ---
    at ConsoleApp1.ThrowException.Bar() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 59
    at ConsoleApp1.ThrowException.Foo() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 47
    at ConsoleApp1.ThrowException.ToString() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 30
    --- End of inner exception stack trace ---
    at ConsoleApp1.ThrowException.ToString() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 34
    at ConsoleApp1.PlatformInvokeTest.Main() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 20`;

        let unformattedStackTrace =
`Unhandled Exception: System.NotSupportedException: Foo is not supported.    ---> System.Exception: Baz threw an exception!    ---> System.NotImplementedException: Not yet implemented!    at ConsoleApp1.ThrowException.Qux() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 83    at ConsoleApp1.ThrowException.Baz() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 71    at ConsoleApp1.ThrowException.Bar() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 55    --- End of inner exception stack trace ---    at ConsoleApp1.ThrowException.Bar() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 59    at ConsoleApp1.ThrowException.Foo() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 47    at ConsoleApp1.ThrowException.ToString() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 30    --- End of inner exception stack trace ---    at ConsoleApp1.ThrowException.ToString() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 34    at ConsoleApp1.PlatformInvokeTest.Main() in d:\library\documents\visual studio 2017\Projects\ConsoleApp1\ConsoleApp1\Program.cs:line 20`;
        
        let formattedStackTrace = myExtension.StackTraceFormatter.format(unformattedStackTrace);
        assert.equal(expectedStackTrace, formattedStackTrace);
    });
});