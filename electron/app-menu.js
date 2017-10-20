const AppMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New...',
                click: () => {
                    console.log('Creating new...');
                },
                accelerator: 'Ctrl+N'
            },
            {
                label: 'Open...',
                click: () => {
                    console.log('Opening a file...');
                },
                accelerator: 'Ctrl+O'
            },
            { type: 'separator' },
            {
                label: 'Exit',
                click: () => {
                    console.log('Exiting application');
                },
                accelerator: 'Ctrl+W'
            },
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'copy' },
            { role: 'paste' },
        ]
    },
];

module.exports = AppMenu;
