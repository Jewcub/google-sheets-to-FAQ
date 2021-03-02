const testHTML = `<ul class="lst-kix_o479q88lcowc-0 start"><li><span>Section 1</span></li></ul><ul class="lst-kix_o479q88lcowc-1 start"><li><span>Q1</span></li></ul><ul class="lst-kix_o479q88lcowc-2 start"><li><span>A1</span></li></ul><ul class="lst-kix_o479q88lcowc-3 start"><li><span>Sub 1</span></li><li><span>Sub 2</span></li></ul><ul class="lst-kix_o479q88lcowc-1"><li><span>Q2</span></li></ul><ul class="lst-kix_o479q88lcowc-2 start"><li><span>A1</span></li></ul><ul class="lst-kix_o479q88lcowc-3 start"><li><span>Sub 1</span></li></ul><ul class="lst-kix_o479q88lcowc-2"><li><span>A2</span></li><li><span>A3</span></li></ul><ul class="lst-kix_o479q88lcowc-0"><li><span>Section 2</span></li></ul><ul class="lst-kix_o479q88lcowc-1 start"><li><span>Q1</span></li></ul><ul class="lst-kix_o479q88lcowc-2 start"><li><span>A1</span></li></ul><ul class="lst-kix_o479q88lcowc-3 start"><li><span>Sub 1</span></li><li><span>Sub 2</span></li></ul><ul class="lst-kix_o479q88lcowc-1"><li><span>Q2</span></li></ul><ul class="lst-kix_o479q88lcowc-2 start"><li><span>A1</span></li></ul><ul class="lst-kix_o479q88lcowc-3 start"><li><span>Sub 1</span></li></ul><ul class="lst-kix_o479q88lcowc-2"><li><span>A2</span></li><li><span>A3</span></li></ul>`;
import parseHTML from './parseHTML';
describe('HTML Parser', () => {
  it('runs', () => {
    const result = parseHTML(testHTML);
    console.log({ result });
    expect(result).toBeTruthy();
  });
});
