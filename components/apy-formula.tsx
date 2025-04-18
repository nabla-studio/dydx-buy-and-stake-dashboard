/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export const ApyFormula = () => {
  return (
    <math
      className="my-1"
      xmlns="http://www.w3.org/1998/Math/MathML"
      display="block"
    >
      <mi mathvariant="normal" className="font-sans">
        A
      </mi>
      <mi mathvariant="normal" className="font-sans">
        P
      </mi>
      <mi mathvariant="normal" className="font-sans">
        Y
      </mi>
      <mo>=</mo>
      <mrow>
        <msup>
          <mrow>
            <mo fence="true" stretchy="true">
              (
            </mo>
            <mn className="font-sans">1</mn>
            <mo>+</mo>
            <mfrac>
              <mrow>
                <mi mathvariant="normal" className="font-sans">
                  A
                </mi>
                <mi mathvariant="normal" className="font-sans">
                  P
                </mi>
                <mi mathvariant="normal" className="font-sans">
                  R
                </mi>
              </mrow>
              <mn className="font-sans">365</mn>
            </mfrac>
            <mo fence="true" stretchy="true">
              )
            </mo>
          </mrow>
          <mn className="font-sans">365</mn>
        </msup>
        <mo className="font-sans">&#x2212;</mo>
        <mn className="font-sans">1</mn>
      </mrow>
    </math>
  );
};
