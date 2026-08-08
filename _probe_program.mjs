import ts from "typescript";
import path from "node:path";

const cwd = "C:/Users/ALVIN/ScreenFlow/artifacts/api-server";
const configPath = path.join(cwd, "tsconfig.json");
const config = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, cwd);

console.log("=== moduleResolution:", parsed.options.moduleResolution, "===");
console.log("=== rootDir:", parsed.options.rootDir, "===");
console.log("=== fileNames:", parsed.fileNames, "===");

const program = ts.createProgram({
  rootNames: parsed.fileNames,
  options: parsed.options,
});

const diags = ts.getPreEmitDiagnostics(program);
console.log("=== createProgram diagnostics:", diags.length, "===");
for (const d of diags) {
  const msg = ts.flattenDiagnosticMessageText(d.messageText, "\n");
  const where = d.file
    ? `${path.relative(cwd, d.file.fileName)}:${d.file.getLineAndCharacterOfPosition(d.start).line + 1}`
    : "(global)";
  console.log(`${where} [${d.code}] ${msg.split("\n")[0]}`);
}
