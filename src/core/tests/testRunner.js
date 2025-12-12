import { TEST_CASES } from './testCases/index.js';
import { validateMetrics, validateGantt, validateAverages } from './validators/index.js';
import * as algorithms from '../algorithms/index.js';

/**
 * Executa suite de testes completa
 */
export const runTests = () => {
  console.log('\n🧪 Iniciando testes dos algoritmos de escalonamento...\n');

  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    failures: [],
  };

  const algorithmList = [
    { name: 'FIFO', fn: algorithms.FIFO },
    { name: 'SJF', fn: algorithms.SJF },
    { name: 'SRTF', fn: algorithms.SRTF },
    { name: 'Round Robin', fn: algorithms.RoundRobin },
    { name: 'Priority (Non-Preemptive)', fn: algorithms.PriorityNonPreemptive },
    { name: 'Priority (Preemptive)', fn: algorithms.PriorityPreemptive },
  ];

  algorithmList.forEach((algo) => {
    console.log(`\n📋 Testando: ${algo.name}`);
    console.log('─'.repeat(60));

    TEST_CASES.forEach((testCase) => {
      results.total++;
      const testName = `${algo.name} - ${testCase.name}`;

      try {
        // Executa algoritmo
        const result = algo.fn(testCase.processes, testCase.quantum);

        // Valida resultados
        const metricsErrors = validateMetrics(result, testCase.processes);
        const ganttErrors = validateGantt(result, testCase.processes);
        const averagesErrors = validateAverages(result, testCase.processes);

        const allErrors = [...metricsErrors, ...ganttErrors, ...averagesErrors];

        if (allErrors.length === 0) {
          results.passed++;
          console.log(`✅ ${testName}`);
        } else {
          results.failed++;
          results.failures.push({
            test: testName,
            errors: allErrors,
          });
          console.log(`❌ ${testName}`);
          allErrors.forEach((error) => console.log(`   └─ ${error}`));
        }
      } catch (error) {
        results.failed++;
        results.failures.push({
          test: testName,
          errors: [error.message],
        });
        console.log(`❌ ${testName}`);
        console.log(`   └─ Erro: ${error.message}`);
      }
    });
  });

  // Relatório final
  console.log('\n' + '═'.repeat(60));
  console.log('📊 RELATÓRIO FINAL');
  console.log('═'.repeat(60));
  console.log(`Total de testes: ${results.total}`);
  console.log(`✅ Passou: ${results.passed}`);
  console.log(`❌ Falhou: ${results.failed}`);
  console.log(`📈 Taxa de sucesso: ${((results.passed / results.total) * 100).toFixed(1)}%`);

  if (results.failed > 0) {
    console.log('\n❌ Testes que falharam:');
    results.failures.forEach((failure) => {
      console.log(`\n  ${failure.test}`);
      failure.errors.forEach((error) => console.log(`    └─ ${error}`));
    });
  }

  console.log('\n' + '═'.repeat(60));

  return results;
};

export default runTests;
