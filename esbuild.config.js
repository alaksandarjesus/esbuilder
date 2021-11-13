// require('esbuild').build({
//     entryPoints: ['src/scripts/app.js'],
//     outfile: 'dist/scripts/app.js',
//     bundle: true,
//     watch: {
//       onRebuild(error, result) {
//         if (error) console.error('watch build failed:', error)
//         else console.log('watch build succeeded:', result)
//       },
//     },
//   }).then(result => {
//     console.log('watching...')
//   })



    const esbuild = require('esbuild');
    let examplePlugin = {
        name: 'example',
        setup(build) {
            let path = require('path')
            build.onStart(() => {
                console.log('build started')
            }),
                // Redirect all paths starting with "images/" to "./public/images/"
                build.onResolve({ filter: /\.*/ }, args => {
                    console.log(path.join(args.resolveDir, 'dist', args.path) )
                    // tried to use node fs to move file. But this code is executed only if there is a change in css or js file. 
                    // return { path: path.join(args.resolveDir, 'dist', args.path) }
                }),
                // Redirect all paths starting with "images/" to "./public/images/"
                build.onLoad({ filter: /^images\// }, args => {
                    // return { path: path.join(args.resolveDir, 'public', args.path) }
                }),
                build.onEnd(result => {
                    console.log(`build ended with ${result.errors.length} errors`)
                })
        },
    }
    esbuild.build({
        entryPoints: ['src/styles/libs.css', 'src/styles/app.css', 'src/scripts/libs.js', 'src/scripts/app.js'],
        bundle: true,
        watch: true,
        outdir: 'dist',
        plugins: [examplePlugin]
    }).then(result => {
        console.log('watching libs.css')
    });

    esbuild.serve({
        port: 3000,
        servedir: 'dist'
    }, {
    }).then(server => {
        console.log('running on server', server)
    });