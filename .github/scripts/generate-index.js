const fs = require('fs');
const path = require('path');

const GITHUB_REPO_OWNER = 'Kuingsmile';
const GITHUB_REPO_NAME = 'piclist-ScriptsHub';
const BRANCH = 'main';

const categories = [
  'onSoftwareOpen', 'onSoftwareClose', 'preProcess', 'beforeTransform',
  'transform', 'beforeUpload', 'upload', 'afterUpload',
  'onUploadSuccess', 'onGalleryRemove', 'manualTrigger', 'uploader.advancedplist'
];

function parseScriptMeta(content, fileName, category) {
  const meta = {
    name: fileName.replace('.js', ''),
    author: 'Unknown',
    description: '',
    version: '1.0.0',
    fileName,
    category,
  };

  const metaRegex = /\/\*\*[\s\S]*?\*\//;
  const metaMatch = content.match(metaRegex);

  if (metaMatch) {
    const metaBlock = metaMatch[0];
    const nameMatch = metaBlock.match(/@name\s+(.+)/);
    if (nameMatch) meta.name = nameMatch[1].trim();

    const authorMatch = metaBlock.match(/@author\s+(.+)/);
    if (authorMatch) meta.author = authorMatch[1].trim();

    const descMatch = metaBlock.match(/@description\s+(.+)/);
    if (descMatch) meta.description = descMatch[1].trim();

    const versionMatch = metaBlock.match(/@version\s+(.+)/);
    if (versionMatch) meta.version = versionMatch[1].trim();
  }

  return meta;
}

async function generate() {
  const allScripts = [];
  const rootDir = process.cwd();

  for (const category of categories) {
    const dirPath = path.join(rootDir, category);

    if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.js'));

      for (const fileName of files) {
        const filePath = path.join(dirPath, fileName);
        const content = fs.readFileSync(filePath, 'utf-8');
        const stats = fs.statSync(filePath);
        
        const meta = parseScriptMeta(content, fileName, category);
        
        allScripts.push({
          ...meta,
          content: content,
          downloadUrl: `https://cdn.jsdelivr.net/gh/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}@${BRANCH}/${category}/${fileName}`,
          createdAt: stats.birthtime.toISOString(),
          updatedAt: stats.mtime.toISOString()
        });
      }
    }
  }

  fs.writeFileSync(
    path.join(rootDir, 'scripts.json'),
    JSON.stringify(allScripts, null, 2),
    'utf-8'
  );
  console.log(`Successfully generated scripts.json with ${allScripts.length} scripts.`);
}

generate();