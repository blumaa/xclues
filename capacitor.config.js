var config = {
    appId: 'com.blumaa.xclues',
    appName: 'xclues',
    webDir: 'dist',
    ios: {
        preferredContentMode: 'mobile',
        allowsLinkPreview: false,
    },
    server: {
        iosScheme: 'capacitor',
    },
    plugins: {
        SplashScreen: {
            launchAutoHide: false,
            backgroundColor: '#0f0a1a',
            showSpinner: false,
        },
        StatusBar: {
            style: 'DARK',
            backgroundColor: '#0f0a1a',
        },
    },
};
export default config;
