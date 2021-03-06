/*
 * Copyright 2014 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.rhq.metrics.restServlet.influx.query.parse.definition;

import org.joda.time.Instant;

/**
 * @author Thomas Segismont
 */
public class DateOperand implements InstantOperand {
    private final Instant instant;

    public DateOperand(Instant instant) {
        this.instant = instant;
    }

    public Instant getInstant() {
        return instant;
    }
}
