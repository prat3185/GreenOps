namespace GreenOps.Server.Services
{
    public static class CarbonIntensityService
    {
        // Example: Carbon intensity (kgCO2e per kWh) for different geographies
        public static readonly Dictionary<string, double> GeographyCarbonPerKWh = new()
        {
            { "West Europe", 0.25 },
            { "East US", 0.40 },
            { "Central India", 0.70 },
            { "Australia", 0.80 },
            { "Brazil", 0.10 }
        };

        // Power consumption constants (Watts)
        public const int cpuCores = 2; // azure hosted agent cpu cores
        public const int ramGb = 7;   // azure hosted agent ram in GB
        public const int ssdDisk = 14; // azure hosted agent ssd disk in GB
        public const double MemoryPowerWatts = 0.372 * ramGb; // 
        public const double CpuPowerWatts= 15.0 * cpuCores;   // Example: 15W per CPU core
        public const double DiskPowerWatts = 0.1 * ssdDisk;    // Example: 0.1W per GB of disk


        /// <summary>
        /// Calculates total carbon emissions (kgCO2e) for a given duration, geography, CPU, and RAM.
        /// </summary>
        /// <param name="totalDurationHours">Total duration in hours</param>
        /// <param name="geography">Geography/region name</param>
        /// <returns>Total carbon emissions in kgCO2e</returns>
        public static double Calculate(
            double totalDurationInSeconds,
            string geography)
        {
            // Get carbon intensity for the geography (default to 0.5 if not found)
            double carbonPerKWh = GeographyCarbonPerKWh.TryGetValue(geography, out var value) ? value : 0.5;

            // Total power in kW
            double totalWatts = MemoryPowerWatts + CpuPowerWatts;
            double totalKWh = (totalWatts * totalDurationInSeconds) / 3600.0;

            // Total carbon emissions
            return totalKWh * carbonPerKWh;
        }
    }
}
