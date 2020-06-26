module.exports = {
    envId: 'elvinn-1aa07a',
    functionRoot: './dist/cloudfunctions',
    functions: [
        // 此函数配置仅供参考，你需要创建一个 app 函数
        {
            name: 'oauth',
            timeout: 20,
            runtime: 'Nodejs10.15',
            memorySize: 128,
            handler: 'index.main',
            installDependency: true,
        },
    ],
};