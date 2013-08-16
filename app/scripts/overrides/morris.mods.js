 //just changed to return point index
 Morris.Line.prototype._drawPointFor = function(index) {
      var circle, row, _i, _len, _ref, _results, origDataPoint;
      this.seriesPoints[index] = [];
      _ref = this.data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        circle = null;
        if (row._y[index] != null) {
            circle = this.drawLinePoint(row._x, row._y[index], this.options.pointSize, 
          	this.colorFor(row, index, 'point'), index);
        }
        //my mod
        origDataPoint = this.options.data[_i];
        circle.node.setAttribute('class','p'+parseInt(origDataPoint.s));
        //end my mod
        _results.push(this.seriesPoints[index].push(circle));
      }
      return _results;
    };

Morris.Grid.prototype.drawGrid = function() {
      var lineY, y, _i, _len, _ref, _results;
      if (this.options.grid === false && this.options.axes === false) {
        return;
      }
      _ref = this.grid;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        lineY = _ref[_i];
        y = this.transY(lineY);
        if (this.options.axes) {
          this.drawYAxisLabel(this.left - this.options.padding / 2, y, this.yAxisFormat(lineY)).node.setAttribute('class','yax p'+parseInt(lineY));
        }
        if (this.options.grid) {
          var line =
          _results.push(this.drawGridLine("M" + this.left + "," + y + "H" + (this.left + this.width)).node.setAttribute('class','gline p'+parseInt(lineY)));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };


        Morris.Line.prototype.drawLinePath = function(path, lineColor) {
      return this.raphael.path(path).attr('stroke', lineColor).attr('stroke-width', this.options.lineWidth).node.setAttribute('class','gl');
    };



// //now we have point we can add additional data
// Morris.Line.prototype.drawLinePoint = function(xPos, yPos, size, pointColor, lineIndex, pointIndex) {
//            var origDataPoint = this.options.data[pointIndex];
//            //can use this to draw arrow direction etc....
//           // debugger;
//            return this.raphael.circle(xPos, yPos, size).attr('fill', 'orange').attr('stroke-width', this.strokeWidthForSeries(lineIndex)).attr('stroke', this.strokeForSeries(lineIndex)).node.setAttribute('class','p'+parseInt(origDataPoint.s));
// };