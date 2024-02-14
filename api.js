const express = require('express');
const { PythonShell } = require('python-shell');
const app = express();
const port = 3000;

function generateText(prompt, res) {
    const options = {
        mode: 'text',
        pythonOptions: ['-u'], // unbuffered output
        scriptPath: __dirname,
        args: [prompt]
    };

    PythonShell.run('llmscript.py', options, (err, result) => {
        if (err) {
            console.error('Error occurred while executing Python script:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result[0]);
        }
    });
}

app.get('/', (req, res) => {
    res.send('Welcome to the homepage');
});

app.get('/generate-text', (req, res) => {
    const prompt = req.query.prompt || "G#f#";
    generateText(prompt, res);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});






// ----------------------------------ORIGINAL CODE---------------



// const express = require('express');
// const { PythonShell } = require('python-shell');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Welcome to the homepage');
// });

// app.get('/generate-text', (req, res) => {
//     const prompt = req.query.prompt || "G#f";

//     const options = {
//         mode: 'text',
//         pythonOptions: ['-u'], // unbuffered output
//         scriptPath: __dirname,
//         args: [prompt]
//     };

//     PythonShell.run('llm_script.py', options, (err, result) => {
//         if (err) {
//             console.error('Error occurred while executing Python script:', err);
//             res.status(500).send('Internal Server Error');
//         } else {
//             res.send(result[0]);
//         }
//     });
// });

// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });
