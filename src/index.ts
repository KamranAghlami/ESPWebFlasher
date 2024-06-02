import 'normalize.css';
import './css/style.css';

window.addEventListener('DOMContentLoaded', () => {
    import('./terminal').then(({ initiate_termial }) => {
        initiate_termial();
        main();
    });
});

interface Release {
    tag_name: string;
    assets: Asset[];
}

interface Asset {
    name: string;
    browser_download_url: string;
}

function get_repository_url(): string | null {
    const params = new URLSearchParams(window.location.search);

    return params.get('repo');
}

async function main() {
    const repository_url = get_repository_url();

    if (!repository_url) {
        console.error('Error: Repository URL not specified');

        return;
    }

    const response = await fetch(`https://api.github.com/repos/${repository_url}/releases`);

    if (!response.ok) {
        const error = await response.json();

        console.error(error.message);

        return;
    }

    const releases: Release[] = await response.json();

    if (releases.length)
        console.log(`Releases:`);

    releases.forEach((release, index) => {
        console.log(` * ${release.tag_name}${index === 0 ? ' (latest)' : ''}`);

        release.assets.forEach(asset => {
            console.log(`   - \u001b]8;;${asset.browser_download_url}\u0007${asset.name}\u001b]8;;\u0007`);
        });

        console.log(``);
    });
}
