# Details

Date : 2023-10-11 15:28:18

Directory /Users/wzy/Desktop/项目/SatEdgeManager-FE/satedgemanager-fe

Total : 63 files,  20823 codes, 378 comments, 482 blanks, all 21683 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.env](/.env) | Properties | 1 | 0 | 0 | 1 |
| [.eslintrc.cjs](/.eslintrc.cjs) | JavaScript | 12 | 1 | 2 | 15 |
| [.gitlab-ci.yml](/.gitlab-ci.yml) | YAML | 36 | 0 | 3 | 39 |
| [.gitlab/agents/k3s/config.yaml](/.gitlab/agents/k3s/config.yaml) | YAML | 0 | 0 | 1 | 1 |
| [.gitlab/agents/k8s/config.yaml](/.gitlab/agents/k8s/config.yaml) | YAML | 0 | 0 | 1 | 1 |
| [.postcssrc.js](/.postcssrc.js) | JavaScript | 7 | 2 | 2 | 11 |
| [.prettierrc.json](/.prettierrc.json) | JSON | 8 | 0 | 0 | 8 |
| [Dockerfile](/Dockerfile) | Docker | 10 | 0 | 10 | 20 |
| [README.md](/README.md) | Markdown | 14 | 0 | 8 | 22 |
| [build/build.js](/build/build.js) | JavaScript | 35 | 0 | 7 | 42 |
| [build/check-versions.js](/build/check-versions.js) | JavaScript | 45 | 0 | 10 | 55 |
| [build/utils.js](/build/utils.js) | JavaScript | 80 | 5 | 17 | 102 |
| [build/vue-loader.conf.js](/build/vue-loader.conf.js) | JavaScript | 21 | 0 | 2 | 23 |
| [build/webpack.base.conf.js](/build/webpack.base.conf.js) | JavaScript | 74 | 4 | 5 | 83 |
| [build/webpack.dev.conf.js](/build/webpack.dev.conf.js) | JavaScript | 82 | 7 | 7 | 96 |
| [build/webpack.prod.conf.js](/build/webpack.prod.conf.js) | JavaScript | 114 | 24 | 8 | 146 |
| [config/dev.env.js](/config/dev.env.js) | JavaScript | 6 | 0 | 2 | 8 |
| [config/index.js](/config/index.js) | JavaScript | 29 | 25 | 16 | 70 |
| [config/prod.env.js](/config/prod.env.js) | JavaScript | 4 | 0 | 1 | 5 |
| [default.conf](/default.conf) | Properties | 14 | 24 | 7 | 45 |
| [index.html](/index.html) | HTML | 11 | 1 | 1 | 13 |
| [package-lock.json](/package-lock.json) | JSON | 15,427 | 0 | 1 | 15,428 |
| [package.json](/package.json) | JSON | 68 | 0 | 1 | 69 |
| [src/App.vue](/src/App.vue) | Vue | 54 | 4 | 8 | 66 |
| [src/assets/addedge.svg](/src/assets/addedge.svg) | XML | 1 | 0 | 0 | 1 |
| [src/assets/createDevice.5677854c.svg](/src/assets/createDevice.5677854c.svg) | XML | 1 | 0 | 0 | 1 |
| [src/assets/css/global.css](/src/assets/css/global.css) | CSS | 12 | 0 | 2 | 14 |
| [src/assets/mesConfig.svg](/src/assets/mesConfig.svg) | XML | 1 | 0 | 0 | 1 |
| [src/components/HelloWorld.vue](/src/components/HelloWorld.vue) | Vue | 110 | 1 | 3 | 114 |
| [src/components/Home.vue](/src/components/Home.vue) | Vue | 16 | 1 | 4 | 21 |
| [src/main.js](/src/main.js) | JavaScript | 36 | 8 | 6 | 50 |
| [src/router/index.js](/src/router/index.js) | JavaScript | 177 | 8 | 7 | 192 |
| [src/views/AddDeployment.vue](/src/views/AddDeployment.vue) | Vue | 127 | 6 | 11 | 144 |
| [src/views/AddEdgeNode.vue](/src/views/AddEdgeNode.vue) | Vue | 86 | 0 | 6 | 92 |
| [src/views/AddImage.vue](/src/views/AddImage.vue) | Vue | 86 | 0 | 10 | 96 |
| [src/views/AddJob.vue](/src/views/AddJob.vue) | Vue | 122 | 1 | 10 | 133 |
| [src/views/AddPod.vue](/src/views/AddPod.vue) | Vue | 130 | 8 | 11 | 149 |
| [src/views/AddService.vue](/src/views/AddService.vue) | Vue | 110 | 0 | 7 | 117 |
| [src/views/AddUser.vue](/src/views/AddUser.vue) | Vue | 103 | 0 | 8 | 111 |
| [src/views/DeploymentManagement.vue](/src/views/DeploymentManagement.vue) | Vue | 164 | 7 | 11 | 182 |
| [src/views/EdgeNode.vue](/src/views/EdgeNode.vue) | Vue | 138 | 17 | 10 | 165 |
| [src/views/GPUInfo.vue](/src/views/GPUInfo.vue) | Vue | 402 | 17 | 30 | 449 |
| [src/views/Home.vue](/src/views/Home.vue) | Vue | 213 | 16 | 21 | 250 |
| [src/views/ImageManagement.vue](/src/views/ImageManagement.vue) | Vue | 135 | 8 | 5 | 148 |
| [src/views/JobManagement.vue](/src/views/JobManagement.vue) | Vue | 147 | 13 | 7 | 167 |
| [src/views/LogManagement.vue](/src/views/LogManagement.vue) | Vue | 106 | 0 | 8 | 114 |
| [src/views/Login.vue](/src/views/Login.vue) | Vue | 72 | 19 | 3 | 94 |
| [src/views/NPUInfo.vue](/src/views/NPUInfo.vue) | Vue | 345 | 36 | 18 | 399 |
| [src/views/NodeInfo.vue](/src/views/NodeInfo.vue) | Vue | 496 | 25 | 57 | 578 |
| [src/views/PodManagement.vue](/src/views/PodManagement.vue) | Vue | 171 | 9 | 19 | 199 |
| [src/views/ServiceManagement.vue](/src/views/ServiceManagement.vue) | Vue | 169 | 52 | 11 | 232 |
| [src/views/StorageManagement.vue](/src/views/StorageManagement.vue) | Vue | 94 | 4 | 4 | 102 |
| [src/views/StreamingComputingTask.vue](/src/views/StreamingComputingTask.vue) | Vue | 301 | 9 | 7 | 317 |
| [src/views/TaskflowManagement.vue](/src/views/TaskflowManagement.vue) | Vue | 0 | 0 | 1 | 1 |
| [src/views/UpdateDeployment.vue](/src/views/UpdateDeployment.vue) | Vue | 101 | 0 | 14 | 115 |
| [src/views/UpdatePod.vue](/src/views/UpdatePod.vue) | Vue | 89 | 6 | 10 | 105 |
| [src/views/UserManagement.vue](/src/views/UserManagement.vue) | Vue | 134 | 4 | 5 | 143 |
| [src/views/VMManagement.vue](/src/views/VMManagement.vue) | Vue | 94 | 3 | 5 | 102 |
| [src/views/layout/components/header.vue](/src/views/layout/components/header.vue) | Vue | 29 | 0 | 5 | 34 |
| [src/views/layout/components/index.js](/src/views/layout/components/index.js) | JavaScript | 3 | 0 | 1 | 4 |
| [src/views/layout/components/main.vue](/src/views/layout/components/main.vue) | Vue | 15 | 0 | 5 | 20 |
| [src/views/layout/components/sidebar.vue](/src/views/layout/components/sidebar.vue) | Vue | 119 | 2 | 17 | 138 |
| [vite.config.js](/vite.config.js) | JavaScript | 16 | 1 | 3 | 20 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)