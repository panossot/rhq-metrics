/// <reference path="../../vendor/vendor.d.ts" />

/// Copyright 2014 Red Hat, Inc.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///    http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.

module Services {
    'use strict';


    export class MetricDataService {

        public static  $inject = ['$q', '$rootScope', '$http', '$localStorage', 'BASE_URL','TENANT_ID'];

        constructor(private $q:ng.IQService, private $rootScope:ng.IRootScopeService, private $http:ng.IHttpService, public $localStorage:any, private BASE_URL:string, private TENANT_ID:string) {

        }

        getBaseUrl():string {
            return 'http://' + this.$rootScope.$storage.server.replace(/['"]+/g, '') + ':' + this.$rootScope.$storage.port + this.BASE_URL + '/'+this.TENANT_ID;
        }

        getAllMetrics() {
            console.info('-- Retrieving all metrics');
            var base = this.getBaseUrl()+'/metrics/?type=num',
                deferred = this.$q.defer();


            this.$http.get(base).success((data) => {
                deferred.resolve(data);
            }).error((reason, status) => {
                console.error('Error Retrieving all metrics :' + status + ", " + reason);
                toastr.warning('No Metrics retrieved.');
                deferred.reject(status + " - " + reason);
            });

            return deferred.promise;
        }


        getMetricsForTimeRange(id:string, startDate:Date, endDate:Date, buckets:number):any {
            console.info('-- Retrieving metrics data for id: ' + id);
            console.info('-- Date Range: ' + startDate + ' - ' + endDate);
            var numBuckets = buckets || 60,
                base = this.getBaseUrl(),
                deferred = this.$q.defer(),
                searchParams =
                {
                    params: {
                        start: startDate.getTime(),
                        end: endDate.getTime(),
                        buckets: numBuckets
                    }
                };

            if (startDate >= endDate) {
                console.warn("Start date was after end date");
                deferred.reject("Start date was after end date");
            }

            this.$http.get(base + '/metrics/numeric/' + id+'/data', searchParams).success((data) => {
                deferred.resolve(data);
            }).error((reason, status) => {
                console.error('Error Loading Chart Data:' + status + ", " + reason);
                deferred.reject(status + " - " + reason);
            });

            return deferred.promise;
        }

    }


    angular.module('rhqm.services')
        .service('metricDataService', MetricDataService);
}
