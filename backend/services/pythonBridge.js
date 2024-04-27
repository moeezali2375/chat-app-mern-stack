const { spawn } = require('child_process');

const executePython = async (script, args) => {
  const arguments = args.map((arg) => arg.toString());

  const py = spawn("python3", [script, ...arguments]);

  const result = await new Promise((resolve, reject) => {
    let output;

    // Get output from python script
    py.stdout.on("data", (data) => {
      output = JSON.parse(data);
    });

    // Handle errors
    py.stderr.on("data", (data) => {
      console.error(`[python] Error occured: ${data}`);
      reject(`Error occured in ${script}`);
    });

    py.on("exit", (code) => {
      resolve(output);
    });
  });

  return result;
};

module.exports = { executePython };
