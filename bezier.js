export class Bezier {
  static solveEpsilon(duration) {
    return 1.0 / (200.0 * duration);
  }

  static unit(p1x, p1y, p2x, p2y) {
    let cx = 3.0 * p1x,
      bx = 3.0 * (p2x - p1x) - cx,
      ax = 1.0 - cx - bx,
      cy = 3.0 * p1y,
      by = 3.0 * (p2y - p1y) - cy,
      ay = 1.0 - cy - by;

    let sampleCurveX = (t) => {
      return ((ax * t + bx) * t + cx) * t;
    };

    let sampleCurveY = (t) => {
      return ((ay * t + by) * t + cy) * t;
    };

    let sampleCurveDerivativeX = (t) => {
      return (3.0 * ax * t + 2.0 * bx) * t + cx;
    };

    let solveCurveX = (x, epsilon) => {
      let t0, t1, t2, x2, d2, i;

      for (t2 = x, i = 0; i < 8; i++) {
        x2 = sampleCurveX(t2) - x;
        if (Math.abs (x2) < epsilon) {
          return t2;
        }
        d2 = sampleCurveDerivativeX(t2);
        if (Math.abs(d2) < 1e-6) {
          break;
        }
        t2 = t2 - x2 / d2;
      }

      t0 = 0.0;
      t1 = 1.0;
      t2 = x;

      if (t2 < t0) {
        return t0;
      }
      if (t2 > t1) {
        return t1;
      }

      while (t0 < t1) {
        x2 = sampleCurveX(t2);
        if (Math.abs(x2 - x) < epsilon) {
          return t2;
        }
        if (x > x2) {
          t0 = t2;
        } else {
          t1 = t2;
        }
        t2 = (t1 - t0) * 0.5 + t0;
      }

      return t2;
    };

    let solve = (x, epsilon) => {
      return sampleCurveY(solveCurveX(x, epsilon));
    };

    return (x, duration) => {
      return solve(x, Bezier.solveEpsilon(+duration));
    };
  }

  static cubic(p1x, p1y, p2x, p2y, x, duration) {
    return Bezier.unit(p1x, p1y, p2x, p2y)(x, duration);
  }
}
