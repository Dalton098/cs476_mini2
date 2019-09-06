//Purpose: The engine behind the 3D primitive operations for Mini Assignment 1

vec3 = glMatrix.vec3;

//////////////////////////////////////////////
///********    Geometry Functions   *******///
//////////////////////////////////////////////
//This is where you will have to fill in some code

/**
 * Given three 3D vertices a, b, and c, compute the area 
 * of the triangle they span
 * @param {vec3} a First point
 * @param {vec3} b Second point
 * @param {vec3} c Third point
 * 
 * @return {float} Area of the triangle
 */
function getTriangleArea(a, b, c) {

  let ab = vec3.create();
  let ac = vec3.create();

  vec3.subtract(ab, b, a);
  vec3.subtract(ac, c, a);

  crossProduct = vec3.create();

  vec3.cross(crossProduct, ab, ac)

  magCrossProduct = Math.sqrt(vec3.dot(crossProduct, crossProduct));

  area = (1 / 2) * magCrossProduct;

  return area;
}


/**
 * Find the intersection of the ray p0 + tv, t >= 0, with the
 * sphere centered at c with radius r.
 * 
 * @param {vec3} p0 Endpoint of the ray
 * @param {vec3} v Direction of the ray
 * @param {vec3} c Center of the sphere
 * @param {number} r Radius of the sphere
 * 
 * @return {list of vec3} A list of intersection points, 
 *   ***in the order in which the ray hits them***
 * If the ray doesn't hit any points, this list should be empty.
 * Note that a ray can hit at most 2 points on a sphere.
 */
function rayIntersectSphere(p0, v, c, r) {

  let p0c = vec3.create();
  vec3.subtract(p0c, p0, c);

  let eqnA = vec3.dot(v, v);
  let eqnB = (2 * vec3.dot(p0c, v));
  let eqnC = vec3.dot(p0c, p0c) - (r * r);

  let discrim = (eqnB * eqnB) - (4 * eqnA * eqnC);

  var toReturn = [];
  var intersect1 = vec3.create();
  var intersect2 = vec3.create();

  if (discrim < 0) {
    return toReturn;

  } else {

    firstT = (-eqnB - Math.sqrt(discrim)) / (2 * eqnA);

    if (firstT > 0) {
      vec3.scaleAndAdd(intersect1, p0, v, firstT);
      toReturn.push(intersect1);
    }

    if (discrim > 0) {
      secondT = (-eqnB + Math.sqrt(discrim)) / (2 * eqnA);

      if (secondT > 0) {
        vec3.scaleAndAdd(intersect2, p0, v, secondT);
        toReturn.push(intersect2);
      }

    }

  }

  return toReturn;
}


/**
 * Compute the barycentric coordinates of a point p with respect to a triangle /\abc
 * 
 * @param {vec3} a Point a on the triangle
 * @param {vec3} b Point b on the triangle
 * @param {vec3} c Point c on the triangle
 * @param {vec3} p The point whose barycentric coordinates we seek
 * 
 * @return {vec3} An vec3 with the barycentric coordinates (alpha, beta, gamma)
 * 				  corresponding to a, b, and c, respectively, so that
 * 				  alpha + beta + gamma = 1, and alpha, beta, gamma >= 0
 *          CORNER CASES:
 * 				  (1) If p is not inside of /\abc, then return [0, 0, 0]
 *          (2) If /\abc is zero area, then return [1, 0, 0] iff p = a (=b=c)
 *              otherwise, return [0, 0, 0]
 */
function getBarycentricCoords(a, b, c, p) {

  let overallArea = getTriangleArea(a, b, c);
  let Aa = getTriangleArea(b, p, c) / overallArea;
  let Ab = getTriangleArea(a, p, c) / overallArea;
  let Ac = getTriangleArea(a, p, b) / overallArea;

  toReturn = vec3.create();

   if ((Aa + Ab + Ac) > 1.01) {
     return toReturn;
   }

  if (overallArea === 0) {

    if (vec3.equals(a, p)) {
      toReturn[0] = 1;
      return toReturn;
    }

    return toReturn;
  }

  toReturn[0] = Aa;
  toReturn[1] = Ab;
  toReturn[2] = Ac;

  return toReturn;  //This is a dummy value!  Replace with your answer
}



/**
 * Find the intersection of a ray with a triangle
 * 
 * @param {vec3} p0 Endpoint of ray 
 * @param {vec3} v Direction of ray
 * @param {vec3} a Triangle vertex 1
 * @param {vec3} b Triangle vertex 2
 * @param {vec3} c Triangle vertex 3
 * 
 * @return {list} A list of vec3 objects.  The list should be empty
 *          if there is no intersection, or it should contain 
 *          exactly one vec3 object if there is an intersection
 *          CORNER CASES:
 *          (1) If the ray is parallel to the plane, 
*               return an empty list
 */
function rayIntersectTriangle(p0, v, a, b, c) {
  // TODO: Fill this in
  return []; //This is a dummy value!  Replace with your answer
}




///////////////////////////////////////////////////////////////////
///********           Plotting Utilities                 *******///
///////////////////////////////////////////////////////////////////

//This is code that Chris Tralie has written in to help plot the results
//for help debugging.  Feel free to browse the code to see how plot.ly works
//and ask any questions on the forum

//This is the way I hack the axes to be equal
function getAxesEqual(vs) {
  //Determine the axis ranges
  minval = 0;
  maxval = 0;
  for (var i = 0; i < vs.length; i++) {
    for (var j = 0; j < 3; j++) {
      if (vs[i][j] < minval) { minval = vs[i][j]; }
      if (vs[i][j] > maxval) { maxval = vs[i][j]; }
    }
  }
  return {
    x: {
      x: [minval, maxval], y: [0, 0], z: [0, 0],
      mode: 'lines', line: { color: '#000000', width: 1 }, type: 'scatter3d', name: 'xaxis'
    },
    y: {
      x: [0, 0], y: [minval, maxval], z: [0, 0],
      mode: 'lines', line: { color: '#000000', width: 1 }, type: 'scatter3d', name: 'yaxis'
    },
    z: {
      x: [0, 0], y: [0, 0], z: [minval, maxval],
      mode: 'lines', line: { color: '#000000', width: 1 }, type: 'scatter3d', name: 'zaxis'
    }
  };
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    X: evt.clientX - rect.left,
    Y: evt.clientY - rect.top
  };
}