 //just changed to return point index
 Morris.Line.prototype._drawPointFor = function(index) {
      var circle, row, _i, _len, _ref, _results;
      this.seriesPoints[index] = [];
      _ref = this.data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        circle = null;
        if (row._y[index] != null) {
         //my mod
          circle = this.drawLinePoint(row._x, row._y[index], this.options.pointSize, 
          	this.colorFor(row, index, 'point'), index, _i);
        }
        _results.push(this.seriesPoints[index].push(circle));
      }
      return _results;
    };

//now we have point we can add additional data
Morris.Line.prototype.drawLinePoint = function(xPos, yPos, size, pointColor, lineIndex, pointIndex) {
           var origDataPoint = this.options.data[pointIndex];
           //can use this to draw arrow direction etc....
          // debugger;
           return this.raphael.circle(xPos, yPos, size).attr('fill', 'red').attr('stroke-width', this.strokeWidthForSeries(lineIndex)).attr('stroke', this.strokeForSeries(lineIndex));
};