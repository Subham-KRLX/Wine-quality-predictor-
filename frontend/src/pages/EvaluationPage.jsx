import React from 'react';
import report from '../data/evaluation.json';

const EvaluationPage = () => (
  <div className="pt-32 pb-24 px-4">
    <div className="max-w-5xl mx-auto space-y-10">
      <header>
        <p className="text-wine-300 text-sm font-semibold mb-3">UCI WINE QUALITY</p>
        <h1 className="text-3xl md:text-5xl font-bold">Model evaluation</h1>
        <p className="mt-4 text-charcoal-300 max-w-3xl leading-relaxed">
          A reproducible comparison on unseen samples. Models were selected using cross-validation,
          then evaluated on a separate test set. This benchmark does not replace or measure the older hosted model.
        </p>
      </header>

      <section aria-label="Dataset and split" className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-white/15">
        {[[report.sample_count, 'Total samples'], [report.train_count, 'Training samples'],
          [report.test_count, 'Test samples'], [report.duplicate_feature_rows, 'Repeated measurement rows']].map(([value, label]) => (
          <div key={label}><p className="text-2xl font-bold">{value.toLocaleString()}</p><p className="text-sm text-charcoal-300 mt-1">{label}</p></div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">How the comparison works</h2>
        <p className="text-charcoal-300 leading-relaxed">{report.method} Identical measurements cannot appear on both sides of a split. Scaling is fitted inside each training fold.</p>
        <p className="mt-3 text-charcoal-300">Selected by cross-validation: <strong className="text-white">{report.selected}</strong>. Lower mean absolute error (MAE) is better.</p>
        <div className="overflow-x-auto mt-5">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Cross-validation on training data</caption>
            <thead><tr className="border-b border-white/20"><th scope="col" className="p-3">Model</th><th scope="col" className="p-3">Mean MAE</th><th scope="col" className="p-3">Fold standard deviation</th></tr></thead>
            <tbody>{report.validation.map(row => <tr key={row.name} className="border-b border-white/10"><th scope="row" className="p-3 font-medium">{row.name}</th><td className="p-3">{row.cv_mae.toFixed(3)}</td><td className="p-3">{row.cv_std.toFixed(3)}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">Untouched test results</h2>
        <p className="text-charcoal-300">MAE is the average error in quality points, not an accuracy percentage. R² measures improvement over predicting the test-set mean.</p>
        <div className="overflow-x-auto mt-5">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Test-set model comparison</caption>
            <thead><tr className="border-b border-white/20">{['Model', 'MAE', 'RMSE', 'R²', 'Within 1 point'].map(label => <th key={label} scope="col" className="p-3 whitespace-nowrap">{label}</th>)}</tr></thead>
            <tbody>{report.test_results.map(row => <tr key={row.name} className="border-b border-white/10"><th scope="row" className="p-3 font-medium">{row.name}</th><td className="p-3">{row.mae.toFixed(3)}</td><td className="p-3">{row.rmse.toFixed(3)}</td><td className="p-3">{row.r2.toFixed(3)}</td><td className="p-3">{(row.within_one_point * 100).toFixed(1)}%</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">Where the selected model struggles</h2>
        <p className="text-charcoal-300">Rare ratings have fewer examples. Read their errors alongside sample counts; an overall average can hide poor performance at the extremes.</p>
        <div className="overflow-x-auto mt-5">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Selected model error by actual quality rating</caption>
            <thead><tr className="border-b border-white/20">{['Actual rating', 'Test samples', 'Mean prediction', 'MAE'].map(label => <th key={label} scope="col" className="p-3 whitespace-nowrap">{label}</th>)}</tr></thead>
            <tbody>{report.test_results.find(row => row.name === report.selected).by_rating.map(row => <tr key={row.rating} className="border-b border-white/10"><th scope="row" className="p-3">{row.rating}</th><td className="p-3">{row.count}</td><td className="p-3">{row.mean_prediction.toFixed(2)}</td><td className="p-3">{row.mae.toFixed(3)}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <footer className="pt-6 border-t border-white/15 text-sm text-charcoal-300 space-y-3">
        <p>scikit-learn {report.sklearn_version} · Random seed {report.seed} · 3-fold grouped cross-validation</p>
        <p className="break-all">Dataset SHA-256: {report.dataset_sha256}</p>
        <a href={report.source} target="_blank" rel="noopener noreferrer" className="inline-block underline text-wine-300">Dataset source and documentation</a>
      </footer>
    </div>
  </div>
);

export default EvaluationPage;
