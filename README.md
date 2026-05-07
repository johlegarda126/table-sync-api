API de backend para la gestión de reservas en restaurantes.

+ Permite el registro de restaurantes con datos necesarios para la identidad, a este `id` único se deben vincular mesas creadas. 

+ Las reservas se programan para restaurantes específicos, considerando fecha, hora y número de personas.

+ Los restaurantes cuentan con mesas de diferentes capacidades; las solicitudes de reserva se validan según la disponibilidad y capacidad de las mesas.

+ Las mesas tienen plazas limitadas; una reserva no puede exceder la capacidad disponible en el horario solicitado.

+ Ciclo de vida del estado de la reserva: pendiente → confirmada → completada, o cancelación.

+ Cada cliente se identifica por su correo electrónico, nombre y número de teléfono.

+ Un cliente puede realizar múltiples reservas, pero no puede tener reservas activas en el mismo horario.

+ Las reservas bloquean una mesa durante un tiempo determinado para evitar solapamientos.

+ Se genera un pago al momento de realizar la reserva y este se procesa a través de una pasarela de pago simulada.