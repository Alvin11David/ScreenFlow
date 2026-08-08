import ts from "typescript";
import path from "node:path";

const cwd = process.cwd();

function fileExists(p) {
  return ts.sys.fileExists(p);
}

function cachedReadFile(p) {
  return ts.sys.readFile(p);
}

function readConfig(configFileName) {
  const configPath = path.resolve(configFileName);
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    path.dirname(configPath)
  );
  return parsed;
}

const ignoreDiagnostics = [6059, 18002, 18003];

const config = readConfig("tsconfig.json");
const memoryCache = new Map();
const serviceHost = {
  getScriptFileNames: () => config.fileNames,
  getScriptVersion: () => "0",
  getScriptSnapshot(fileName) {
    const contents = ts.sys.readFile(fileName);
    return contents ? ts.ScriptSnapshot.fromString(contents) : undefined;
  },
  readFile: cachedReadFile,
  readDirectory: ts.sys.readDirectory,
  fileExists: fileExists,
  directoryExists: ts.sys.directoryExists,
  getNewLine: () => ts.sys.newLine,
  useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
  getCurrentDirectory: () => cwd,
  getCompilationSettings: () => config.options,
  getDefaultLibFileName: () => ts.getDefaultLibFilePath(config.options),
  getCustomTransformers: () => undefined,
};

const service = ts.createLanguageService(serviceHost);
const program = service.getProgram();
const diagnostics = ts.getPreEmitDiagnostics(program);

console.log("=== Program source files ===");
for (const f of program.getSourceFiles()) {
  const rel = path.relative(cwd, f.fileName);
  const lines = f.getLineStarts().length;
  if (/app\.ts$|index\.ts$|health\.ts$|auth\.ts$/.test(rel)) {
    console.log(`${rel} (${lines} lines)`);
  }
}

console.log("=== moduleResolution:", config.options.moduleResolution, "customConditions:", config.options.customConditions, "types:", config.options.types, "skipLibCheck:", config.options.skipLibCheck, "noEmitOnError:", config.options.noEmitOnError, "strict:", config.options.strict === undefined ? "(inherited)" : config.options.strict, "esModuleInterop:", config.options.esModuleInterop, "allowSyntheticDefaultImports:", config.options.allowSyntheticDefaultImports);

for (const [fromFile, mod] of [
  ["src/app.ts", "express"],
  ["src/app.ts", "@types/express"],
  ["src/lib/auth.ts", "drizzle-orm"],
  ["src/lib/auth.ts", "@workspace/db"],
  ["src/routes/health.ts", "@workspace/api-zod"],
]) {
  const from = ts.sys.resolvePath(`${cwd}/${fromFile}`);
  const r = ts.resolveModuleName(mod, from, config.options, ts.sys);
  console.log(`${fromFile} -> ${mod} =>`, r.resolvedModule && r.resolvedModule.resolvedFileName);
}

console.log("=== Pre-emit diagnostics ===");
for (const d of diagnostics) {
  const msg = ts.flattenDiagnosticMessageText(d.messageText, "\n");
  const where = d.file
    ? `${path.relative(cwd, d.file.fileName)}:${d.start}:${d.length}`
    : "(global)";
  console.log(`${where} [${d.code}] ${msg}`);
}
console.log("=== Total diagnostics:", diagnostics.length, "===");

console.log("=== getEmitOutput per file ===");
for (const fileName of config.fileNames) {
  const rel = path.relative(cwd, fileName);
  const out = service.getEmitOutput(fileName);
  console.log(`${rel}: emitSkipped=${out.emitSkipped} outputFiles=${out.outputFiles.length}`);
}
