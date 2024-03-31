const { exec } = require('child_process');

const {
    addCnameRecord,
    apiKey,
    apiSecret,
    domain,
} = require("../scripts/index");

const execShellCommand = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
};

async function deployMernApp(req, res) {
    const { accessKey, secretKey, repoLink, projectName } = req.body;
    process.chdir("terraform/mern");
    let output = await execShellCommand("terraform init");
    console.log(output);
    output = await execShellCommand(`terraform apply -auto-approve -var="access_key=${accessKey}" -var="secret_key=${secretKey}" -var="github_link=${repoLink}" -var="project_name=${projectName}"`);
    console.log(output);
    output = await JSON.parse(await execShellCommand("terraform output -json"))
    console.log(output);
    console.log(output['instace_public_dns'])
    addCnameRecord(apiKey, apiSecret, domain,output['instace_public_dns'], projectName);
    res.send(`http://${projectName}.majs.live`);
}

async function deployStaticApplication(req, res) {
    const { accessKey, secretKey, repoLink, projectName } = req.body;
    console.log("Reached here")
    process.chdir("terraform/static/");
    let output = await execShellCommand("terraform init");
    console.log(output);
    output = await execShellCommand(`terraform apply -auto-approve -var="access_key=${accessKey}" -var="secret_key=${secretKey}" -var="git_repo=${repoLink}" -var="project_name=${projectName}"`);
    output = JSON.parse(await execShellCommand("terraform output -json"))
    const targetData = output.instace_public_dns.value;
    addCnameRecord(apiKey, apiSecret, domain,projectName,targetData,6000);
    res.send(`http://${projectName}.majs.live`);
}

async function deployLampApp(req, res) {
    const { accessKey, secretKey, repoLink, projectName } = req.body;
    process.chdir("terraform/lamp");
    let output = execShellCommand(`terraform apply -auto-approve -var="access_key=${accessKey}" -var="secret_key=${secretKey}" -var="github_link=${repoLink}" -var="project_name=${projectName}"`);
    res.send('project deployed successfully');

}

async function destroyMernApp(req, res) {
    const { accessKey, secretKey, repoLink, projectName } = req.body;
    process.chdir("terraform/mern");
    let output = execShellCommand(`terraform destroy -auto-approve -var="access_key=${accessKey}" -var="secret_key=${secretKey}" -var="github_link=${repoLink}" -var="project_name=${projectName}"`);
    res.send('project destroyed successfully');
}

async function destroyStaticApp(req, res) {
    const { accessKey, secretKey, repoLink, projectName } = req.body;
    process.chdir("terraform/static");
    let output = execShellCommand(`terraform destroy -auto-approve -var="access_key=${accessKey}" -var="secret_key=${secretKey}" -var="git_repo=${repoLink}" -var="project_name=${projectName}"`);
    console.log(output);
    res.send('project destroyed successfully');
}

module.exports = {
    deployMernApp,
    deployStaticApplication,
    destroyMernApp,
    destroyStaticApp
};