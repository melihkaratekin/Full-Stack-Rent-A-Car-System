using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using Castle.DynamicProxy;
using Core.Utilities.Interceptors;
using Core.Utilities.IoC;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Aspects.Autofac.Performance
{
    public class PerformanceAspect : MethodInterception
    {
        
        private int _interval;          // Eşik değeri olan süreyi tutan değişken.
        private Stopwatch _stopwatch;   // Kronometre değişkeni.


        public PerformanceAspect(int interval)
        {
            _interval = interval;
            _stopwatch = ServiceTool.ServiceProvider.GetService<Stopwatch>();
        }

        // İlgili metot işleme koyulmadan önce kronometreyi başlatan metot.
        protected override void OnBefore(IInvocation invocation)
        {
            _stopwatch.Start();
        }

        // İlgili metodun işlemi bittikten sonra kronometreyi durduran ve eşik değerinden büyükse bunu bildiren metot.
        protected override void OnAfter(IInvocation invocation)
        {
            if (_stopwatch.Elapsed.TotalSeconds > _interval)
            {
                Debug.WriteLine($"Performance : {invocation.Method.DeclaringType.FullName}.{invocation.Method.Name}-->{_stopwatch.Elapsed.TotalSeconds}");
            }
            _stopwatch.Reset();
        }
    }
}