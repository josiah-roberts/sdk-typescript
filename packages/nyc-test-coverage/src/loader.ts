import { createInstrumenter } from 'istanbul-lib-instrument';
import * as convert from 'convert-source-map';
import type { LoaderDefinitionFunction } from 'webpack';

const instrumentWithIstanbulLoader: LoaderDefinitionFunction = function (source, sourceMap): void {
  const srcMap = sourceMap ?? convert.fromSource(source)?.sourcemap;

  const instrumenter = createInstrumenter({
    esModules: true,
    produceSourceMap: true,
  });

  instrumenter.instrument(
    source,
    this.resourcePath,
    (error, instrumentedSource) => {
      this.callback(error, instrumentedSource, instrumenter.lastSourceMap() as any);
    },
    srcMap as any
  );
};

export default instrumentWithIstanbulLoader;
